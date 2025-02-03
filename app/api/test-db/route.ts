import { NextResponse } from 'next/server';
import { checkDatabaseConnection } from '@/lib/db';

export async function GET() {
  try {
    // Test database connection
    const connection = await checkDatabaseConnection();
    
    if (connection.success) {
      return NextResponse.json({
        status: 'success',
        message: 'Database connection successful',
        timestamp: connection.timestamp,
      });
    } else {
      return NextResponse.json({
        status: 'error',
        message: 'Database connection failed',
        error: connection.error
      }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Failed to test database connection',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}