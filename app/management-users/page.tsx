"use client"

import { useState } from "react"
import FilterDropdown from "../components/ui/dropdown"
import PageLayout from "../components/ui/page-layout"
import { BsPlus } from "react-icons/bs"
import { BiLock, BiPencil, BiSearch, BiTrash } from "react-icons/bi"
import { FcDocument } from "react-icons/fc"

interface Item {
    value: string
    name: string
}

const dummyCategories: Item[] = [
    { value: "1", name: "smartphone" },
    { value: "2", name: "televisi" }
]

export default function SubCategory() {
    const [selectedCategory, setSelectedCategory] = useState<string>("")

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
                        <button onClick={() => { location.href = "/home/add" }} type="button" className="btn-main w-100 max-h-50 max-w-35 pt-1 pb-1 mt-0">
                            <span className="flex flex-row pr-2 pl-2 pt-1 pb-1 text-center align-center" ><BsPlus size={20} />Tambah Data</span>
                        </button>
                    </div>

                    <div className="flex flex-row align-start">
                        <FilterDropdown
                            defaultItem="Semua Role"
                            items={dummyCategories}
                            selectedItem={selectedCategory}
                            selectItem={(item) => setSelectedCategory(item)}
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
                        <tr>
                            <td>1</td>
                            <td>
                                <div className="flex flex-row" >
                                    <button className="btn p-0" onClick={() => { location.href = "/home/edit/" + 1 }} ><BiPencil /></button>
                                    <button className="btn p-0" ><BiLock /></button>
                                    <button className="btn p-0" ><BiTrash color="red" /></button>
                                </div>
                            </td>
                            <td>admin123</td>
                            <td>Admin</td>
                            <td>admin@gmail.com</td>
                            <td>Admin</td>
                        </tr>
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
        </PageLayout>
    )
}