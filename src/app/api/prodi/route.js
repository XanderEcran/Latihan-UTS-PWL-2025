import prisma from '@/app/lib/prisma';

export async function GET(){
    const data = await prisma.prodi.findMany({
        orderBy: {id:'asc'},
    });
    return new Response(JSON.stringify(data), {status:200});
}

export async function POST(request) {
    const {kode, nama, kepala} = await request.json();

    if (!kode || !nama || !kepala) {
        return new Response(JSON.stringify({error: 'Semua field wahib diisi'}), {
            status: 400, 
        });
    }
    const prodi = await prisma.prodi.create({
        data: {kode, nama, kepala},
    });
    return new Response(JSON.stringify(prodi), {status: 201});
}

export async function PUT(request) {
    const {id, kode, nama, kepala} = await request.json();

    if(!id || !kode || !nama || !kepala) return Response.json({error: 'Field Kosong'}, {status : 400});

    const prodi = await prisma.prodi.update({
        where : {id},
        data: {kode, nama, kepala},
    });
    return Response.json(prodi)
}
