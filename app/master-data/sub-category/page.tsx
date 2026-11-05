"use client"

import { useEffect, useState } from "react"
import FilterDropdown from "../../components/ui/dropdown"
import PageLayout from "../../components/ui/page-layout"
import { BsPlus } from "react-icons/bs"
import { BiPencil, BiSearch, BiTrash } from "react-icons/bi"
import { FcDocument } from "react-icons/fc"
import axios from "axios"

interface Item {
    value: string
    name: string
}


interface SubCategory {
    id: number
    category: string
    name: string
    price_limit: number
}

interface Category {
    id: number
    code: string
    name: string
}

export default function SubCategory() {
    const [categories, setDataCategory] = useState<Category[] | []>([])
    const [data, setData] = useState<SubCategory[] | []>([])
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<SubCategory>({
        id: 0,
        category: "",
        name: "",
        price_limit: 0
    })
    const [newData, setNewData] = useState<{ category: string, name: string, price_limit: number }>({
        category: "",
        name: "",
        price_limit: 0
    })
    const [page, setPage] = useState<number>(1)

    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("")
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        handleGetCategoryData()
        handleGetData()
    }, [])

    async function handleGetCategoryData() {
        try {
            const apiToken = await localStorage.getItem("api_token")
            const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "category/get-all?page=" + page, {
                headers: {
                    Authorization: "Bearer " + apiToken
                }
            });

            if (response.status == 200 || response.status == 201) {
                setDataCategory(response?.data?.data || [])
            } else {

            }
        } catch (error: any) {
            console.log("Error response:", error?.response);
        }
    }

    async function handleGetData() {
        try {
            const apiToken = await localStorage.getItem("api_token")
            const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "sub-category/get-all?page=" + page, {
                headers: {
                    Authorization: "Bearer " + apiToken
                }
            });

            if (response.status == 200 || response.status == 201) {
                setData(response?.data?.data || [])
            } else {

            }
        } catch (error: any) {
            console.log("Error response:", error?.response);
        }
    }

    async function handleAddData() {
        try {
            const apiToken = await localStorage.getItem("api_token")
            const response = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + "sub-category/add", {
                category: selectedCategory,
                name: newData?.name,
                price_limit: newData?.price_limit,
            }, {
                headers: {
                    Authorization: "Bearer " + apiToken
                },
            });

            if (response.status == 200 || response.status == 201) {
                handleGetData()
                setIsOpen(false)
                setNewData({ category: "", name: "", price_limit: 0 })
            } else {

            }
        } catch (error: any) {
            setIsOpen(false)
            console.log("Error response:", error?.response);
        }
    }

    async function handleEditData() {
        try {
            const apiToken = await localStorage.getItem("api_token")
            const response = await axios.put(process.env.NEXT_PUBLIC_BASE_URL + "sub-category/update", {
                id: selectedItem?.id,
                category: selectedItem?.category,
                name: selectedItem?.name,
                price_limit: selectedItem?.price_limit,
            }, {
                headers: {
                    Authorization: "Bearer " + apiToken
                },
            });

            if (response.status == 200 || response.status == 201) {
                handleGetData()
                setIsEditOpen(false)
                setSelectedItem({ id: 0, category: "", name: "", price_limit: 0 })
            } else {

            }
        } catch (error: any) {
            setIsOpen(false)
            console.log("Error response:", error?.response);
        }
    }

    async function handleDeleteData(id: number) {
        try {
            const apiToken = await localStorage.getItem("api_token")
            const response = await axios.delete(process.env.NEXT_PUBLIC_BASE_URL + "sub-category/delete/" + id, {
                headers: {
                    Authorization: "Bearer " + apiToken
                },
            });

            if (response.status == 200 || response.status == 201) {
                handleGetData()
                setIsOpen(false)
            } else {

            }
        } catch (error: any) {
            setIsOpen(false)
            console.log("Error response:", error?.response);
        }
    }


    return (
        <PageLayout>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Home</li>
                    <li className="breadcrumb-item active" aria-current="page">Master Data</li>
                    <li className="breadcrumb-item active" aria-current="page">Sub Kategori</li>
                </ol>
            </nav>
            <h5>Sub Kategori</h5>
            <div>
                <div className="flex flex-row justify-between align-start" >
                    <div className="max-h-20 self-center" >
                        <button onClick={() => setIsOpen(true)} type="button" className="btn-main w-100 max-h-50 max-w-35 pt-1 pb-1 mt-0">
                            <span className="flex flex-row pr-2 pl-2 pt-1 pb-1 text-center align-center" ><BsPlus size={20} />Tambah Data</span>
                        </button>
                    </div>

                    <div className="flex flex-row align-start">
                        <FilterDropdown
                            defaultItem="Kategori"
                            items={categories?.map(i => ({ value: i.name, name: i.name } as Item))}
                            selectedItem={selectedCategoryFilter}
                            selectItem={(item) => setSelectedCategoryFilter(item)}
                            classes={"mr-2"}
                        />

                        <div className="input-group mb-3 max-h-20 max-w-50">
                            <input type="text" className="form-control max-h-10 max-w-50 text-sm p-2" placeholder="Cari data..." aria-label="Cari data..." aria-describedby="basic-addon1" />
                            <span className="input-group-text max-h-10" id="basic-addon1"><BiSearch /></span>
                        </div>
                    </div>
                </div>
                <table className="table table-striped table-bordered mt-5">
                    <thead>
                        <tr>
                            <td className="text-sm text-center" >NO</td>
                            <td className="text-sm text-center" >ACTION</td>
                            <td className="text-sm text-center" >KATEGORI BARANG</td>
                            <td className="text-sm text-center" >SUB KATEGORI BARANG</td>
                            <td className="text-sm text-center" >BATAS HARGA (RP.)</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, index) => {
                            return (
                                <tr key={item?.id} >
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex flex-row justify-center items-center" >
                                            <button className="btn p-0" onClick={() => { setSelectedItem(item); setIsEditOpen(true) }} ><BiPencil /></button>
                                            <button onClick={() => handleDeleteData(item?.id)} className="btn p-0" ><BiTrash color="red" /></button>
                                        </div>
                                    </td>
                                    <td>{item?.category}</td>
                                    <td>{item?.name}</td>
                                    <td>{item?.price_limit}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </div>
            {/* Modal Add Category */}
            {isOpen && (
                <div
                    className="modal show d-block"
                    tabIndex={-1}
                    role="dialog"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="modal-dialog modal-dialog-centered"
                        role="document"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-content">

                            {/* Header */}
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Form
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setIsOpen(false)}
                                />
                            </div>

                            {/* Body */}
                            <div className="modal-body">
                                <label>Kategori</label>
                                <FilterDropdown
                                    defaultItem="Kategori"
                                    items={categories?.map(i => ({ value: i.name, name: i.name } as Item))}
                                    selectedItem={selectedCategory}
                                    selectItem={(item) => setSelectedCategory(item)}
                                    classes={"mr-2"}
                                />
                                <div className="flex flex-col align-start">
                                    <label>Nama Sub Kategori</label>
                                    <div className="input-group mb-3 max-h-20 max-w-50">
                                        <input value={newData?.name} onChange={(e) => setNewData(prev => ({ ...prev, name: e.target.value }))} type="text" className="form-control max-h-10 max-w-50 text-sm p-2" placeholder="Masukkan Kode Kategori" aria-label="" aria-describedby="basic-addon1" />
                                    </div>
                                </div>
                                <div className="flex flex-col align-start">
                                    <label>Batas Harga</label>
                                    <div className="input-group mb-3 max-h-20 max-w-50">
                                        <input value={newData?.price_limit} onChange={(e) => setNewData(prev => ({ ...prev, price_limit: parseInt(e.target.value || "0") }))} type="text" className="form-control max-h-10 max-w-50 text-sm p-2" placeholder="Masukkan Nama Kategori" aria-label="" aria-describedby="basic-addon1" />
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Close
                                </button>

                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleAddData()}
                                >
                                    Submit
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
            {isEditOpen && (
                <div
                    className="modal show d-block"
                    tabIndex={-1}
                    role="dialog"
                    onClick={() => setIsEditOpen(false)}
                >
                    <div
                        className="modal-dialog modal-dialog-centered"
                        role="document"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-content">

                            {/* Header */}
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Form
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setIsEditOpen(false)}
                                />
                            </div>

                            {/* Body */}
                            <div className="modal-body">
                                <label>Kategori</label>
                                <FilterDropdown
                                    defaultItem="Kategori"
                                    items={categories?.map(i => ({ value: i.name, name: i.name } as Item))}
                                    selectedItem={selectedCategory}
                                    selectItem={(item) => setSelectedCategory(item)}
                                    classes={"mr-2"}
                                />
                                <div className="flex flex-col align-start">
                                    <label>Nama Sub Kategori</label>
                                    <div className="input-group mb-3 max-h-20 max-w-50">
                                        <input value={selectedItem?.name} onChange={(e) => setSelectedItem(prev => ({ ...prev, name: e.target.value }))} type="text" className="form-control max-h-10 max-w-50 text-sm p-2" placeholder="Masukkan Kode Kategori" aria-label="" aria-describedby="basic-addon1" />
                                    </div>
                                </div>
                                <div className="flex flex-col align-start">
                                    <label>Batas Harga</label>
                                    <div className="input-group mb-3 max-h-20 max-w-50">
                                        <input value={selectedItem?.price_limit} onChange={(e) => setSelectedItem(prev => ({ ...prev, price_limit: parseInt(e.target.value || "0") }))} type="text" className="form-control max-h-10 max-w-50 text-sm p-2" placeholder="Masukkan Nama Kategori" aria-label="" aria-describedby="basic-addon1" />
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Close
                                </button>

                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleEditData()}
                                >
                                    Submit
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
            {/* Backdrop */}
            {isOpen && <div className="modal-backdrop show" />}
        </PageLayout>
    )
}