"use client"

import { useEffect, useState } from "react"
import FilterDropdown from "../components/ui/dropdown"
import PageLayout from "../components/ui/page-layout"
import { BsPlus } from "react-icons/bs"
import { BiLock, BiPencil, BiSearch, BiTrash } from "react-icons/bi"
import { FcDocument } from "react-icons/fc"
import axios from "axios"

interface User {
    id: number
    role: string
    username: string
    name: string
    email: string
}
interface Item {
    value: string
    name: string
}

const roles: Item[] = [
    { value: "admin", name: "Admin" },
    { value: "user", name: "User" }
]

export default function SubCategory() {
    const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>("")
    const [selectedRole, setSelectedRole] = useState<string>("")
    const [isOpen, setIsOpen] = useState(false);
    const [newData, setNewData] = useState<{ role: string, username: string, name: string, email: string, password: string }>({
        role: "",
        username: "",
        name: "",
        email: "",
        password: ""
    })
    const [data, setData] = useState<User[] | []>([])
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        handleGetData()
    }, [])

    async function handleGetData() {
        try {
            const apiToken = await localStorage.getItem("api_token")
            const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "user/get-all?page=" + page, {
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
            const response = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + "user/register", {
                role: selectedRole,
                username: newData?.username,
                name: newData?.name,
                email: newData?.email,
                password: newData?.password,
            }, {
                headers: {
                    Authorization: "Bearer " + apiToken
                },
            });

            if (response.status == 200 || response.status == 201) {
                handleGetData()
                setIsOpen(false)
                setNewData({ role: "", name: "", username: "", email: "", password: "" })
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
                const response = await axios.delete(process.env.NEXT_PUBLIC_BASE_URL + "user/delete/" + id, {
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
            <h5>Manajemen User</h5>
            <div>
                <div className="flex flex-row justify-between align-start" >
                    <div className="max-h-20 self-center" >
                        <button onClick={() => setIsOpen(true)} type="button" className="btn-main w-100 max-h-50 max-w-35 pt-1 pb-1 mt-0">
                            <span className="flex flex-row pr-2 pl-2 pt-1 pb-1 text-center align-center" ><BsPlus size={20} />Tambah Data</span>
                        </button>
                    </div>

                    <div className="flex flex-row align-start">
                        <FilterDropdown
                            defaultItem="Semua Role"
                            items={roles}
                            selectedItem={selectedRoleFilter}
                            selectItem={(item) => setSelectedRoleFilter(item)}
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
                            <td className="text-sm text-center" >USERNAME</td>
                            <td className="text-sm text-center" >NAMA</td>
                            <td className="text-sm text-center" >EMAIL</td>
                            <td className="text-sm text-center" >ROLE</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, index) => {
                            return (
                                <tr key={item.id} >
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex flex-row justify-center items-center" >
                                            <button className="btn p-0" onClick={() => { }} ><BiPencil /></button>
                                            <button className="btn p-0" ><BiLock /></button>
                                            <button onClick={() => handleDeleteData(item?.id)} className="btn p-0" ><BiTrash color="red" /></button>
                                        </div>
                                    </td>
                                    <td>{item?.username}</td>
                                    <td>{item?.name}</td>
                                    <td>{item?.email}</td>
                                    <td>{item?.role}</td>
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
                                <label>Role</label>
                                <FilterDropdown
                                    defaultItem="User"
                                    items={roles}
                                    selectedItem={selectedRole}
                                    selectItem={(item) => setSelectedRole(item)}
                                    classes={"mr-2"}
                                />
                                <div className="flex flex-col align-start">
                                    <label>Username</label>
                                    <div className="input-group mb-3 max-h-20 max-w-50">
                                        <input value={newData?.username} onChange={(e) => setNewData(prev => ({ ...prev, username: e.target.value }))} type="text" className="form-control max-h-10 max-w-50 text-sm p-2" placeholder="Masukkan Username" aria-label="" aria-describedby="basic-addon1" />
                                    </div>
                                </div>
                                <div className="flex flex-col align-start">
                                    <label>Password</label>
                                    <div className="input-group mb-3 max-h-20 max-w-50">
                                        <input value={newData?.password} onChange={(e) => setNewData(prev => ({ ...prev, password: e.target.value }))} type="text" className="form-control max-h-10 max-w-50 text-sm p-2" placeholder="Masukkan Password" aria-label="" aria-describedby="basic-addon1" />
                                    </div>
                                </div>
                                <div className="flex flex-col align-start">
                                    <label>Nama</label>
                                    <div className="input-group mb-3 max-h-20 max-w-50">
                                        <input value={newData?.name} onChange={(e) => setNewData(prev => ({ ...prev, name: e.target.value }))} type="text" className="form-control max-h-10 max-w-50 text-sm p-2" placeholder="Masukkan Nama" aria-label="" aria-describedby="basic-addon1" />
                                    </div>
                                </div>
                                <div className="flex flex-col align-start">
                                    <label>Email</label>
                                    <div className="input-group mb-3 max-h-20 max-w-50">
                                        <input value={newData?.email} onChange={(e) => setNewData(prev => ({ ...prev, email: e.target.value }))} type="text" className="form-control max-h-10 max-w-50 text-sm p-2" placeholder="Masukkan Email" aria-label="" aria-describedby="basic-addon1" />
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
            {/* Backdrop */}
            {isOpen && <div className="modal-backdrop show" />}
        </PageLayout>
    )
}