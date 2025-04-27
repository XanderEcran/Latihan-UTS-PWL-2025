"use client";

import { useEffect, useState } from "react";

export default function ProdiPage() {
    const [prodis, setProdis] = useState([]);
    const [kode, setKode] = useState('');
    const [nama, setNama] = useState('');
    const [kepala, setKepala] = useState('');
    const [msg, setMsg] = useState('');
    const [formVisible, setFormVisible] = useState(false);
    const [editId, setEditId] = useState(null);

    const fetchProdis = async () => {
        const res = await fetch('/api/prodi');
        const data = await res.json();
        setProdis(data);
    };

    useEffect(() => {
        fetchProdis();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editId ? 'PUT' : 'POST';
        const res = await fetch('/api/prodi', {
            method,
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({id : editId, kode, nama, kepala}),
        });
        if (res.ok) {
            setMsg('Berhasil disimpan!');
            setKode('');
            setNama('');
            setKepala('');
            setEditId(null);
            setFormVisible(false);
            fetchProdis();
        }else {
            setMsg('Gagal menyimpan data');
        }
    };

    const handleEdit = (item) => {
        setKode(item.kode);
        setNama(item.nama);
        setKepala(item.kepala);
        setEditId(item.id);
        setFormVisible(true);
    };

    return (
        <div>
            <button
                onClick={() => setFormVisible(!formVisible)}>
                {formVisible ? 'Tutup Form' : 'Tambah Prodi'}
            </button>
            {formVisible && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            value={kode}
                            onChange={(e) => setKode(e.target.value)}
                            placeholder="Masukkan Kode"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            placeholder="Masukkan Nama"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={kepala}
                            onChange={(e) => setKepala(e.target.value)}
                            placeholder="Masukkan Nama Dosen"
                            required
                        />
                    </div>
                    <button type="submit">
                        Simpan
                    </button>
                    <p>{msg}</p>
                </form>
            )}
            <br></br>
            <table border="1">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Kode</th>
                        <th>Nama Prodi</th>
                        <th>Kepala Dosen</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {prodis.map ((item, index) => (
                        <tr key={index.id}>
                            <td>{index + 1}</td>
                            <td>{item.kode}</td>
                            <td>{item.nama}</td>
                            <td>{item.kepala}</td>
                            <td><button onClick={() => handleEdit(item)}>Edit</button></td>
                        </tr>
                    ))}
                    {prodis.length === 0 && (
                        <tr>
                            <td colSpan="5">Belum ada data</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}