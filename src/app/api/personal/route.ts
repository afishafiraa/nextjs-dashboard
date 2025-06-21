import { NextResponse } from "next/server";
import { createRegistration, getAllPersonal, NewPatientData } from "../../../lib/sections/personal.sheet";

export async function POST(req: Request) {
    try {
        const body: NewPatientData = await req.json();
        
        // Validate required fields
        const requiredFields = [
          'nama_anak', 'jenis_kelamin', 'tanggal_lahir', 'nama_ibu'
        ];
        
        // Make other fields optional or provide defaults
        const registrationData = {
          ...body,
          usia_gestasi: body.usia_gestasi || '',
          no_kohort_bayi: body.no_kohort_bayi || '',
          nik_ibu: body.nik_ibu || '',
          nik_anak: body.nik_anak || '',
          nama_bapak: body.nama_bapak || '',
          alamat: body.alamat || '',
          tanggal_kunjungan: body.tanggal_kunjungan || ''
        };
        
        for (const field of requiredFields) {
            if (!registrationData[field as keyof NewPatientData]) {
                return NextResponse.json(
                    { error: `Field ${field} is required` },
                    { status: 400 }
                );
            }
        }
        
        const result = await createRegistration(registrationData);
        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error('Error creating registration:', error);
        return NextResponse.json(
            { error: 'Failed to create registration' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const data = await getAllPersonal();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching registrations:', error);
        return NextResponse.json(
            { error: 'Failed to fetch registrations' },
            { status: 500 }
        );
    }
}