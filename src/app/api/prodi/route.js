import prisma from '@/app/lib/prisma';

export async function GET(){
    const data = await prisma.prodi.findMany({
        orderBy: {id:'asc'},
    });
    return new Response(JSON.stringify(data), {status:200});
}