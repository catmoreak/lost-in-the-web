import { NextRequest, NextResponse } from 'next/server';
import { db } from '~/server/db';
import { leaderboard } from '~/server/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function GET() {
  try {
    const scores = await db
      .select()
      .from(leaderboard)
      .orderBy(desc(leaderboard.score))
      .limit(50);
    
    return NextResponse.json(scores);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ error: 'Could not load leaderboard data.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { playerName, score } = await request.json();
    
    if (!playerName || typeof score !== 'number') {
      return NextResponse.json({ error: 'Player name and score are required.' }, { status: 400 });
    }

    
    const existingPlayer = await db
      .select()
      .from(leaderboard)
      .where(eq(leaderboard.playerName, playerName))
      .limit(1);

    if (existingPlayer.length > 0) {

      if (score > existingPlayer[0]!.score) {
        const updated = await db
          .update(leaderboard)
          .set({ score, updatedAt: new Date() })
          .where(eq(leaderboard.playerName, playerName))
          .returning();
        
        return NextResponse.json(updated[0]);
      } else {
        return NextResponse.json(existingPlayer[0]);
      }
    } else {
      
      const newEntry = await db
        .insert(leaderboard)
        .values({ playerName, score })
        .returning();
      
      return NextResponse.json(newEntry[0]);
    }
  } catch (error) {
    console.error('Error updating leaderboard:', error);
    return NextResponse.json({ error: 'Could not update leaderboard.' }, { status: 500 });
  }
}
