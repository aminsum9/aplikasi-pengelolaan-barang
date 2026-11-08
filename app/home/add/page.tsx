"use client"

import { useEffect, useState } from "react"
import FilterDropdown from "../../components/ui/dropdown"
import PageLayout from "../../components/ui/page-layout"
import { BiArrowBack} from "react-icons/bi"
import { ImCross, ImPlus } from "react-icons/im"
import axios from "axios"

interface Item {
    value: string
    name: string
}

interface Category {
    id: number
    code: string
    name: string
}

interface TableRow {
    id: number;
    name: string;
    price: string;
    amount: string;
    unit: string;
    total: string;
    expired_date: string;
}

const createEmptyRow = (id: number): TableRow => ({
    id,
    name: "",
    price: "",
    amount: "",
    unit: "",
    total: "",
    expired_date: ""
});


export default function AddProduct() {
    const [categories, setCategories] = useState<Item[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const [subCategories, setSubCategory] = useState<Item[]>([])
    const [selectedSubCategory, setSelectedSubCategory] = useState<string>("")
    const [newData, setNewData] = useState<{ code: string, name: string }>({
        code: "",
        name: ""
    })

    useEffect(() => {
        handleGetCategory()
    }, [])

    async function handleGetCategory() {
        try {
            const apiToken = await localStorage.getItem("api_token")
            const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "category/get-all-no-limit", {
                headers: {
                    Authorization: "Bearer " + apiToken
                }
            });

            if (response.status == 200 || response.status == 201) {
                const dataCategories = response?.data?.data as Category[];

                const data: Item[] = dataCategories?.map(item => {return {value: item?.name, name: item?.name } as Item})

                setCategories(data|| [])
            } else {

            }
        } catch (error: any) {
            console.log("Error response:", error?.response);
        }
    }

    async function handleGetSubCategory(category: string) {
        try {
            const apiToken = await localStorage.getItem("api_token")
            const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "sub-category/get-all-no-limit?category=" + category, {
                headers: {
                    Authorization: "Bearer " + apiToken
                }
            });

            if (response.status == 200 || response.status == 201) {
                const dataCategories = response?.data?.data as Category[];

                const data: Item[] = dataCategories?.map(item => {return {value: item?.name, name: item?.name } as Item})

                setSubCategory(data || [])
            } else {

            }
        } catch (error: any) {
            console.log("Error response:", error?.response);
        }
    }

    const [rows, setRows] = useState<TableRow[]>([
        createEmptyRow(1),
    ]);

    const addRow = () => {
        const newId =
            rows.length > 0
                ? Math.max(...rows.map((row) => row.id)) + 1
                : 1;

        setRows((prev) => [...prev, createEmptyRow(newId)]);
    };

    const removeRow = (id: number) => {
        setRows((prev) => prev.filter((row) => row.id !== id));
    };

    const handleChange = (
        id: number,
        field: keyof Omit<TableRow, 'id'>,
        value: string
    ) => {
        setRows((prev) =>
            prev.map((row) =>
                row.id === id ? { ...row, [field]: value } : row
            )
        );
    };

    function handleSave(){
        location.href = "/home";
    }


    return (
        <PageLayout>
            <form className="max-h-150 overflow-auto"  >
                <fieldset >
                    <div className="border-1 border-[#bec3d4] border-solid shadow-sm mb-5 bg-body rounded" >
                        <div className="bg-light w-100 p-3 border-b-1 border-[#bec3d4] border-solid shadow-sm rounded-top" >
                            <h5>Informasi Umum</h5>
                        </div>
                        <div className="p-3" >
                            <div className="flex flex-row justify-between align-start" >
                                <div className="flex flex-col align-start">
                                    <label>Operator</label>
                                    <div className="input-group mb-3 max-h-20 max-w-63">
                                        <input type="text" className="form-control max-h-10 max-w-63 text-sm p-2" placeholder="Contoh: Budi" aria-label="" aria-describedby="basic-addon1" />
                                    </div>
                                    <label>Kategori</label>
                                    <FilterDropdown
                                        defaultItem="Pilih Kategori"
                                        items={categories}
                                        selectedItem={selectedCategory}
                                        selectItem={(item) => {setSelectedCategory(item); handleGetSubCategory(item)}}
                                        classes={"mr-2"}
                                    />
                                    <div className="flex flex-row" >
                                        <div>
                                            <label>Sub Kategori</label>
                                            <FilterDropdown
                                                defaultItem="Pilih Sub Kategori"
                                                items={subCategories}
                                                selectedItem={selectedSubCategory}
                                                selectItem={(item) => setSelectedSubCategory(item)}
                                                classes={"mr-2 min-w-100"}
                                            />
                                        </div>
                                        <div>
                                            <label>Batas Harga</label>
                                            <div className="input-group mb-3 max-h-20 max-w-100">
                                                <input type="text" className="form-control max-h-10 max-w-100 text-sm p-2" placeholder="Contoh: 100000" aria-label="" aria-describedby="basic-addon1" />
                                            </div>
                                        </div>
                                    </div>

                                    <label>Asal Barang</label>
                                    <div className="input-group mb-3 max-h-20 max-w-100">
                                        <input type="text" className="form-control max-h-10 max-w-100 text-sm p-2" placeholder="Cari data..." aria-label="Cari data..." aria-describedby="basic-addon1" />
                                    </div>
                                    <div className="flex flex-row" >
                                        <div className="w-100" >
                                            <label>Nomor Surat</label>
                                            <div className="input-group mb-3 max-h-20 max-w-80">
                                                <input type="text" className="form-control max-h-10 max-w-80 text-sm p-2" placeholder="Masukkan nomor surat..." aria-label="" aria-describedby="basic-addon1" />
                                            </div>
                                        </div>
                                        <div>
                                            <label>Lampiran</label>
                                            <div className="input-group mb-3 max-h-20 max-w-100">
                                                <input type="file" className="form-control max-h-10 max-w-100 text-sm p-2" placeholder="Cari data..." aria-label="" aria-describedby="basic-addon1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-light w-100 p-3 border-b-1 border-[#bec3d4] border-solid shadow-sm rounded-top" >
                            <h5>Informasi Barang</h5>
                        </div>
                        <div className="bg-body mt-4 p-3">
                            <div className="table-responsive">
                                <table className="table align-middle">
                                    <thead>
                                        <tr>
                                            <th>Nama Barang</th>
                                            <th>Harga (Rp.)</th>
                                            <th>Jumlah</th>
                                            <th>Satuan</th>
                                            <th>Total</th>
                                            <th>Tgl. Expired</th>
                                            <th style={{ width: '100px' }}></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {rows.map((row) => (
                                            <tr key={row.id}>
                                                <td>
                                                    <input
                                                        className="form-control"
                                                        value={row.name}
                                                        onChange={(e) =>
                                                            handleChange(row.id, 'name', e.target.value)
                                                        }
                                                    />
                                                </td>

                                                <td>
                                                    <input
                                                        className="form-control"
                                                        value={row.price}
                                                        onChange={(e) =>
                                                            handleChange(row.id, 'price', e.target.value)
                                                        }
                                                    />
                                                </td>

                                                <td>
                                                    <input
                                                        className="form-control"
                                                        value={row.amount}
                                                        onChange={(e) =>
                                                            handleChange(row.id, 'amount', e.target.value)
                                                        }
                                                    />
                                                </td>

                                                <td>
                                                    <input
                                                        className="form-control"
                                                        value={row.unit}
                                                        onChange={(e) =>
                                                            handleChange(row.id, 'unit', e.target.value)
                                                        }
                                                    />
                                                </td>

                                                <td>
                                                    <input
                                                        className="form-control"
                                                        value={row.total}
                                                        onChange={(e) =>
                                                            handleChange(row.id, 'total', e.target.value)
                                                        }
                                                    />
                                                </td>

                                                <td>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        value={row.expired_date}
                                                        onChange={(e) =>
                                                            handleChange(row.id, 'expired_date', e.target.value)
                                                        }
                                                    />
                                                </td>

                                                <td className="text-center">
                                                    {row.id == 1 && (
                                                        <button
                                                            style={{ borderRadius: 30, width: 30, height: 30 }}
                                                            type="button"
                                                            className="border-2 border-solid border-primary shadow-sm bg-body text-black flex items-center justify-center"
                                                            onClick={addRow}
                                                        >
                                                            <ImPlus />
                                                        </button>
                                                    )}
                                                    {row.id != 1 && (
                                                        <button
                                                            style={{ borderRadius: 30, width: 30, height: 30 }}
                                                            type="button"
                                                            className="bg-danger text-white flex items-center justify-center"
                                                            onClick={() => removeRow(row.id)}
                                                            disabled={rows.length === 1}
                                                        >
                                                            <ImCross />
                                                        </button>)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="flex flex-row p-3" >
                            <div className="max-h-20 self-center pr-2" >
                                <button onClick={() => { location.href = "/home" }} type="button" className="btn btn-outline-secondary w-100 max-h-50 max-w-35 pt-1 pb-1 mt-0">
                                    <span className="flex flex-row pr-2 pl-2 pt-1 pb-1 text-center align-center" ><BiArrowBack size={20} />Kembali</span>
                                </button>
                            </div>
                            <div className="max-h-20 self-center" >
                                <button onClick={() => { handleSave() }} type="button" className="btn-main w-35 max-h-50 max-w-35 pt-1 pb-1 mt-0 flex align-center text-center justify-center">
                                    <span className="flex flex-row pr-2 pl-2 pt-1 pb-1 text-center align-center" >Simpan</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
        </PageLayout>
    )
}