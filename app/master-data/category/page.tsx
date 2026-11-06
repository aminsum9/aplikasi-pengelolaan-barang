"use client"

import { useEffect, useState } from "react"
import FilterDropdown from "../../components/ui/dropdown"
import PageLayout from "../../components/ui/page-layout"
import { BsPlus } from "react-icons/bs"
import { BiPencil, BiSearch, BiTrash } from "react-icons/bi"
import { FcDocument } from "react-icons/fc"
import axios from "axios"

interface Category {
    id: number
    code: string
    name: string
}

export default function Category() {
    const [selectedItem, setSelectedItem] = useState<Category>({
        id: 0,
        code: "",
        name: ""
    })
    const [newData, setNewData] = useState<{ code: string, name: string }>({
        code: "",
        name: ""
    })
    const [data, setData] = useState<Category[] | []>([])
    const [page, setPage] = useState<number>(1)
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    useEffect(() => {
        handleGetData()
    }, [])

    async function handleGetData() {
        try {
            const apiToken = await localStorage.getItem("api_token")
            const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "category/get-all?page=" + page, {
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
            const response = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + "category/add", {
                code: newData?.code,
                name: newData?.name,
            }, {
                headers: {
                    Authorization: "Bearer " + apiToken
                },
            });

            if (response.status == 200 || response.status == 201) {
                handleGetData()
                setIsOpen(false)
                setNewData({ code: "", name: "" })
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
            const response = await axios.put(process.env.NEXT_PUBLIC_BASE_URL + "category/update", {
                id: selectedItem?.id,
                code: selectedItem?.code,
                name: selectedItem?.name,
            }, {
                headers: {
                    Authorization: "Bearer " + apiToken
                },
            });

            if (response.status == 200 || response.status == 201) {
                handleGetData()
                setIsEditOpen(false)
                setSelectedItem({id: 0, code: "", name: "" })
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
            const response = await axios.delete(process.env.NEXT_PUBLIC_BASE_URL + "category/delete/" + id, {
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
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active" aria-current="page">Home</li>
                        <li className="breadcrumb-item active" aria-current="page">Master Data</li>
                        <li className="breadcrumb-item active" aria-current="page">Kategori</li>
                    </ol>
                </nav>
                <h5>Kategori</h5>
                <div>
                    <div className="flex flex-row justify-between align-start" >
                        <div className="max-h-20 self-center" >
                            <button onClick={() => setIsOpen(true)} type="button" className="btn-main w-100 max-h-50 max-w-35 pt-1 pb-1 mt-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <span className="flex flex-row pr-2 pl-2 pt-1 pb-1 text-center align-center" ><BsPlus size={20} />Tambah Data</span>
                            </button>
                        </div>

                        <div className="flex flex-row align-start">
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
                                <td className="text-sm text-center" width={100} >ACTION</td>
                                <td className="text-sm text-center" >KODE</td>
                                <td className="text-sm text-center text-center" >NAMA KATEGORI</td>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item) => {
                                return (
                                    <tr key={item?.id} >
                                        <td>1</td>
                                        <td>
                                            <div className="flex flex-row justify-center items-center w-100" >
                                                <button className="btn p-0" onClick={() => { setSelectedItem(item); setIsEditOpen(true) }} ><BiPencil /></button>
                                                <button onClick={() => handleDeleteData(item?.id)} className="btn p-0" ><BiTrash color="red" /></button>
                                            </div>
                                        </td>
                                        <td>{item?.code || ""}</td>
                                        <td>{item?.name || ""}</td>
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
                                <div className="flex flex-col align-start">
                                    <label>Kode Kategori</label>
                                    <div className="input-group mb-3 max-h-20 max-w-50">
                                        <input onChange={(e) => setNewData(prev => ({ ...prev, code: e.target.value }))} type="text" className="form-control max-h-10 max-w-50 text-sm p-2" placeholder="Masukkan Kode Kategori" aria-label="" aria-describedby="basic-addon1" />
                                    </div>
                                </div>
                                <div className="flex flex-col align-start">
                                    <label>Nama Kategori</label>
                                    <div className="input-group mb-3 max-h-20 max-w-50">
                                        <input onChange={(e) => setNewData(prev => ({ ...prev, name: e.target.value }))} type="text" className="form-control max-h-10 max-w-50 text-sm p-2" placeholder="Masukkan Nama Kategori" aria-label="" aria-describedby="basic-addon1" />
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
            {/* Modal Edit Category */}
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
                                <div className="flex flex-col align-start">
                                    <label>Kode Kategori</label>
                                    <div className="input-group mb-3 max-h-20 max-w-50">
                                        <input value={selectedItem?.code} onChange={(e) => setSelectedItem(prev => ({ ...prev, code: e.target.value }))} type="text" className="form-control max-h-10 max-w-50 text-sm p-2" placeholder="Masukkan Kode Kategori" aria-label="" aria-describedby="basic-addon1" />
                                    </div>
                                </div>
                                <div className="flex flex-col align-start">
                                    <label>Nama Kategori</label>
                                    <div className="input-group mb-3 max-h-20 max-w-50">
                                        <input value={selectedItem?.name}  onChange={(e) => setSelectedItem(prev => ({ ...prev, name: e.target.value }))} type="text" className="form-control max-h-10 max-w-50 text-sm p-2" placeholder="Masukkan Nama Kategori" aria-label="" aria-describedby="basic-addon1" />
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