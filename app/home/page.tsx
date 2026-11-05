"use client"

import { useState } from "react"
import FilterDropdown from "../components/ui/dropdown"
import PageLayout from "../components/ui/page-layout"
import { BsPen, BsPlus } from "react-icons/bs"
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

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  return (
    <PageLayout>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">Home</li>
          <li className="breadcrumb-item active" aria-current="page">Barang Masuk</li>
        </ol>
      </nav>
      <h5>Barang Masuk</h5>
      <div>
        <div className="flex flex-row justify-between align-start" >
          <div className="max-h-20 self-center" >
            <button onClick={() => { location.href = "/home/add" }} type="button" className="btn-main w-100 max-h-50 max-w-35 pt-1 pb-1 mt-0">
              <span className="flex flex-row pr-2 pl-2 pt-1 pb-1 text-center align-center" ><BsPlus size={20} />Tambah Data</span>
            </button>
          </div>

          <div className="flex flex-row align-start">
            <FilterDropdown
              defaultItem="Semua Kategori"
              items={dummyCategories}
              selectedItem={selectedCategory}
              selectItem={(item) => setSelectedCategory(item)}
              classes={"mr-2"}
            />
            <FilterDropdown
              defaultItem="Semua Sub Kategori"
              items={dummyCategories}
              selectedItem={selectedCategory}
              selectItem={(item) => setSelectedCategory(item)}
              classes={"mr-2"}
            />
            <FilterDropdown
              defaultItem="Semua Tahun"
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
              <td className="text-sm text-center" >TANGGAL</td>
              <td className="text-sm text-center text-center" >ASAL BARANG</td>
              <td className="text-sm text-center" >PENERIMA</td>
              <td className="text-sm text-center" >UNIT</td>
              <td className="text-sm text-center" >KODE</td>
              <td className="text-sm text-center" >NAMA</td>
              <td className="text-sm text-center" >HARGA</td>
              <td className="text-sm text-center" >JUMLAH</td>
              <td className="text-sm text-center" >TOTAL(RP.)</td>
              <td className="text-sm text-center" >STATUS</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <div className="flex flex-row" >
                  <button className="btn p-0" onClick={() => {location.href = "/home/edit/"+1}} ><BiPencil /></button>
                  <button className="btn p-0" ><FcDocument /></button>
                  <button className="btn p-0" ><BiTrash color="red" /></button>
                </div>
              </td>
              <td>19/05/2026</td>
              <td>Jakarta Utara</td>
              <td>Eko</td>
              <td>50</td>
              <td>TYDS</td>
              <td>Sepeda Motor</td>
              <td>20000000</td>
              <td>200</td>
              <td>4000000000</td>
              <td>Selesai</td>
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