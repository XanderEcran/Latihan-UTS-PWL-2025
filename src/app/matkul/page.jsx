"use client"

import {useEffect, useState} from 'react';

export default function MatkulPage(){
    const [matkuls, setMatkuls] = useState ([]);

    const fetchMatkuls = async () => {
        const res = await fetch('/api/matkul');
        const data = await res.json();
        setMatkuls(data);
    };
    useEffect(() => {
        fetchMatkuls();
    }, []);

    return (
        <div>
            <table border="1">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Kode</th>
                        <th>Nama Matkul</th>
                    </tr>
                </thead>
                <tbody>
                    {matkuls.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.kode}</td>
                            <td>{item.nama}</td>
                        </tr>
                    ))}
                    {matkuls.length === 0 && (
                        <tr>
                            <td colSpan="3">Belum ada data</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}