"use client"

import { useState } from "react"
import FilterDropdown from "../../components/ui/dropdown"
import PageLayout from "../../components/ui/page-layout"
import { BsPlus } from "react-icons/bs"
import { BiPencil, BiSearch, BiTrash } from "react-icons/bi"
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
    const [isOpen, setIsOpen] = useState(false);

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
                            <td className="text-sm text-center" >KATEGORI BARANG</td>
                            <td className="text-sm text-center text-center" >SUB KATEGORI BARANG</td>
                            <td className="text-sm text-center text-center" >BATAS HARGA (RP.)</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>
                                <div className="flex flex-row" >
                                    <button className="btn p-0" onClick={() => { location.href = "/home/edit/" + 1 }} ><BiPencil /></button>
                                    <button className="btn p-0" ><BiTrash color="red" /></button>
                                </div>
                            </td>
                            <td>Perlengkapan Motor</td>
                            <td>Kelistrikan Motor</td>
                            <td>100000</td>
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
                                    items={dummyCategories}
                                    selectedItem={selectedCategory}
                                    selectItem={(item) => setSelectedCategory(item)}
                                    classes={"mr-2"}
                                />
                                <div className="flex flex-col align-start">
                                    <label>Nama Sub Kategori</label>
                                    <div className="input-group mb-3 max-h-20 max-w-50">
                                        <input type="text" className="form-control max-h-10 max-w-50 text-sm p-2" placeholder="Masukkan Kode Kategori" aria-label="" aria-describedby="basic-addon1" />
                                    </div>
                                </div>
                                <div className="flex flex-col align-start">
                                    <label>Batas Harga</label>
                                    <div className="input-group mb-3 max-h-20 max-w-50">
                                        <input type="text" className="form-control max-h-10 max-w-50 text-sm p-2" placeholder="Masukkan Nama Kategori" aria-label="" aria-describedby="basic-addon1" />
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
                                    onClick={() => setIsOpen(false)}
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