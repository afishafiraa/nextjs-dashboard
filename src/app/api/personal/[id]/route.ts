import { NextResponse } from 'next/server';
import { getRegistrationById, updateRegistrationById, deleteRegistrationById, RegistrationData } from '../../../../lib/sections/personal.sheet';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await getRegistrationById(id);
    return data
      ? NextResponse.json(data)
      : NextResponse.json({ error: 'Patient not found' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching patient:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patient' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body: Partial<RegistrationData> = await req.json();
    await updateRegistrationById(id, body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating patient:', error);
    if (error instanceof Error && error.message === 'ID not found') {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update patient' },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await deleteRegistrationById(id);
    return NextResponse.json({ success: true, message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    if (error instanceof Error && error.message === 'ID not found') {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete patient' },
      { status: 500 }
    );
  }
}
