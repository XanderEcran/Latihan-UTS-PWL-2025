"use client";

import { useEffect, useState } from "react";

export default function ProdiPage() {
    const [prodis, setProdis] = useState([]);

    const fetchProdis = async () => {
        const res = await fetch('/api/prodi');
        const data = await res.json();
        setProdis(data);
    };

    useEffect(() => {
        fetchProdis();
    }, []);

    return (
        <div>
            <table border="1">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Kode</th>
                        <th>Nama Prodi</th>
                        <th>Kepala Dosen</th>
                    </tr>
                </thead>
                <tbody>
                    {prodis.map ((item, index) => (
                        <tr key={index.id}>
                            <td>{index + 1}</td>
                            <td>{item.kode}</td>
                            <td>{item.nama}</td>
                            <td>{item.kepala}</td>
                        </tr>
                    ))}
                    {prodis.length === 0 && (
                        <tr>
                            <td colSpan="4">Belum ada data</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}