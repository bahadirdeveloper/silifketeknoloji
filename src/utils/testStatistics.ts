// Test utility for statistics functionality
import { getClubStatistics, subscribeToStatisticsUpdates, type ClubStatistics } from '../lib/supabaseClient';

/**
 * Test the statistics functionality
 */
export async function testStatistics(): Promise<void> {
  console.log('🧪 Testing Statistics Functionality...');
  
  try {
    // Test 1: Get initial statistics
    console.log('📊 Fetching initial statistics...');
    const initialStats = await getClubStatistics();
    console.log('✅ Initial statistics:', initialStats);
    
    // Test 2: Test real-time subscription
    console.log('🔄 Setting up real-time subscription...');
    let updateCount = 0;
    const unsubscribe = subscribeToStatisticsUpdates((stats: ClubStatistics) => {
      updateCount++;
      console.log(`📈 Statistics update #${updateCount}:`, stats);
    });
    
    // Test 3: Wait for potential updates
    console.log('⏳ Waiting for potential real-time updates (10 seconds)...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Cleanup
    unsubscribe();
    console.log('🧹 Cleaned up subscription');
    
    // Test 4: Final statistics check
    console.log('📊 Fetching final statistics...');
    const finalStats = await getClubStatistics();
    console.log('✅ Final statistics:', finalStats);
    
    console.log('🎉 Statistics test completed successfully!');
    
  } catch (error) {
    console.error('❌ Statistics test failed:', error);
  }
}

/**
 * Test statistics with mock data
 */
export function testStatisticsWithMockData(): void {
  console.log('🧪 Testing Statistics with Mock Data...');
  
  const mockStats: ClubStatistics = {
    totalMembers: 5,
    totalApplications: 12,
    pendingApplications: 3
  };
  
  console.log('📊 Mock statistics:', mockStats);
  
  // Test subscription callback
  const callback = (stats: ClubStatistics) => {
    console.log('📈 Mock update received:', stats);
  };
  
  // Simulate updates
  setTimeout(() => callback({ ...mockStats, totalApplications: 13 }), 1000);
  setTimeout(() => callback({ ...mockStats, pendingApplications: 2 }), 2000);
  setTimeout(() => callback({ ...mockStats, totalMembers: 6 }), 3000);
  
  console.log('✅ Mock statistics test completed!');
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).testStatistics = testStatistics;
  (window as any).testStatisticsWithMockData = testStatisticsWithMockData;
}
