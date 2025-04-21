import prisma from '@/app/lib/prisma';

export async function GET(){
    const data = await prisma.matkul.findMany({
        orderBy: {id:'asc'},
    });
    return new Response(JSON.stringify(data), {status:200});
}

export async function POST(request) {
    const {kode, nama} = await request.json();

    if (!kode || !nama) {
        return new Response(JSON.stringify({error: 'Semua field wahib diisi'}), {
            status: 400, 
        });
    }
    const matkul = await prisma.matkul.create({
        data: {kode, nama},
    });
    return new Response(JSON.stringify(matkul), {status: 201});
}