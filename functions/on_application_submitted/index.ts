import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

interface ApplicationData {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  school_work: string;
  interests: string[];
  portfolio_example: string;
  motivation: string;
  weekly_hours: string;
  meeting_preference: string;
  computer_type: string;
  additional_hardware: string[];
  hardware_sharing: string;
  consent_kvkk: boolean;
  consent_date: string;
}

interface ScoringBreakdown {
  portfolio_quality: number;
  motivation_strength: number;
  technical_skills: number;
  availability: number;
  hardware_contribution: number;
  total: number;
}

Deno.serve(async (req: Request) => {
  try {
    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const discordWebhookUrl = Deno.env.get('DISCORD_WEBHOOK_URL');
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the application data from the request
    const { record } = await req.json();
    const application: ApplicationData = record;

    console.log('Processing application:', application.id);

    // Calculate scoring
    const scoring = calculateApplicationScore(application);
    
    // Update application with score
    const { error: updateError } = await supabase
      .from('applications')
      .update({
        score: scoring.total,
        score_breakdown: scoring,
        status: 'under_review'
      })
      .eq('id', application.id);

    if (updateError) {
      console.error('Error updating application score:', updateError);
      throw updateError;
    }

    // Send Discord notification
    if (discordWebhookUrl) {
      await sendDiscordNotification(application, scoring, discordWebhookUrl);
    }

    // Auto-approve high-scoring applications for community level
    if (scoring.total >= 70) {
      await supabase
        .from('applications')
        .update({
          status: 'approved',
          level: 'community',
          admin_notes: 'Otomatik onay - yüksek puan'
        })
        .eq('id', application.id);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        application_id: application.id,
        score: scoring.total,
        status: scoring.total >= 70 ? 'auto_approved' : 'under_review'
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error processing application:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});

function calculateApplicationScore(application: ApplicationData): ScoringBreakdown {
  let portfolio_quality = 0;
  let motivation_strength = 0;
  let technical_skills = 0;
  let availability = 0;
  let hardware_contribution = 0;

  // Portfolio Quality (0-25 points)
  const portfolioLength = application.portfolio_example.length;
  if (portfolioLength >= 200) portfolio_quality += 15;
  else if (portfolioLength >= 100) portfolio_quality += 10;
  else if (portfolioLength >= 50) portfolio_quality += 5;

  // Check for technical indicators in portfolio
  const techKeywords = ['github', 'code', 'programming', 'development', 'project', 'website', 'app'];
  const hasTechKeywords = techKeywords.some(keyword => 
    application.portfolio_example.toLowerCase().includes(keyword)
  );
  if (hasTechKeywords) portfolio_quality += 10;

  // Motivation Strength (0-20 points)
  const motivationLength = application.motivation.length;
  if (motivationLength >= 300) motivation_strength += 15;
  else if (motivationLength >= 150) motivation_strength += 10;
  else if (motivationLength >= 75) motivation_strength += 5;

  // Check for positive motivation keywords
  const positiveKeywords = ['öğrenmek', 'gelişmek', 'katkı', 'topluluk', 'teknoloji', 'proje'];
  const positiveCount = positiveKeywords.filter(keyword => 
    application.motivation.toLowerCase().includes(keyword)
  ).length;
  motivation_strength += Math.min(positiveCount * 2, 5);

  // Technical Skills (0-20 points)
  const interestCount = application.interests.length;
  technical_skills += Math.min(interestCount * 4, 12);

  // Computer type bonus
  if (application.computer_type !== 'none') {
    technical_skills += 8;
  }

  // Availability (0-15 points)
  const weeklyHours = application.weekly_hours.toLowerCase();
  if (weeklyHours.includes('15') || weeklyHours.includes('20') || weeklyHours.includes('+')) {
    availability += 15;
  } else if (weeklyHours.includes('10') || weeklyHours.includes('12')) {
    availability += 10;
  } else if (weeklyHours.includes('5') || weeklyHours.includes('8')) {
    availability += 5;
  }

  // Meeting preference bonus
  if (application.meeting_preference === 'yes') {
    availability += 5;
  } else if (application.meeting_preference === 'online') {
    availability += 3;
  }

  // Hardware Contribution (0-20 points)
  const hardwareCount = application.additional_hardware.filter(h => h !== 'none').length;
  hardware_contribution += Math.min(hardwareCount * 5, 15);

  // Hardware sharing bonus
  if (application.hardware_sharing === 'yes') {
    hardware_contribution += 10;
  } else if (application.hardware_sharing === 'sometimes') {
    hardware_contribution += 5;
  }

  const total = portfolio_quality + motivation_strength + technical_skills + availability + hardware_contribution;

  return {
    portfolio_quality: Math.min(portfolio_quality, 25),
    motivation_strength: Math.min(motivation_strength, 20),
    technical_skills: Math.min(technical_skills, 20),
    availability: Math.min(availability, 15),
    hardware_contribution: Math.min(hardware_contribution, 20),
    total: Math.min(total, 100)
  };
}

async function sendDiscordNotification(
  application: ApplicationData, 
  scoring: ScoringBreakdown, 
  webhookUrl: string
) {
  try {
    const embed = {
      title: "🆕 Yeni Üyelik Başvurusu",
      color: scoring.total >= 70 ? 0x00ff00 : 0xffaa00,
      fields: [
        {
          name: "👤 Başvuran",
          value: application.full_name,
          inline: true
        },
        {
          name: "📧 E-posta",
          value: application.email,
          inline: true
        },
        {
          name: "📱 Telefon",
          value: application.phone,
          inline: true
        },
        {
          name: "🎯 İlgi Alanları",
          value: application.interests.join(", "),
          inline: false
        },
        {
          name: "💻 Bilgisayar",
          value: application.computer_type,
          inline: true
        },
        {
          name: "⏰ Haftalık Saat",
          value: application.weekly_hours,
          inline: true
        },
        {
          name: "📊 Puan",
          value: `${scoring.total}/100`,
          inline: true
        },
        {
          name: "📈 Puan Detayı",
          value: `Portfolio: ${scoring.portfolio_quality}/25\nMotivasyon: ${scoring.motivation_strength}/20\nTeknik: ${scoring.technical_skills}/20\nMüsaitlik: ${scoring.availability}/15\nDonanım: ${scoring.hardware_contribution}/20`,
          inline: false
        }
      ],
      footer: {
        text: `Başvuru ID: ${application.id}`
      },
      timestamp: new Date().toISOString()
    };

    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed]
      })
    });

    console.log('Discord notification sent successfully');
  } catch (error) {
    console.error('Error sending Discord notification:', error);
  }
}
