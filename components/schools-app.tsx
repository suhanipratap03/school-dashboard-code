"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { useForm } from "react-hook-form"

type School = {
  name: string
  address: string
  city: string
  state: string
  contact: string
  email_id: string
  image: string | null
}

function Header({
  onNavigate,
  currentPage,
}: {
  onNavigate: (page: "add" | "show") => void
  currentPage: "add" | "show"
}) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">School Dashboard</h1>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <button
            onClick={() => onNavigate("add")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              currentPage === "add" ? "bg-blue-600 text-white" : "text-slate-600 hover:text-blue-600"
            }`}
            aria-current={currentPage === "add" ? "page" : undefined}
          >
            Add School
          </button>
          <button
            onClick={() => onNavigate("show")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              currentPage === "show" ? "bg-blue-600 text-white" : "text-slate-600 hover:text-blue-600"
            }`}
            aria-current={currentPage === "show" ? "page" : undefined}
          >
            View Schools
          </button>
        </div>
      </div>
    </header>
  )
}

function AddSchoolForm({
  onAddSchool,
}: {
  onAddSchool: (school: School) => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<School>()
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const onSubmit = (data: School) => {
    onAddSchool({ ...data, image: imagePreview })
    reset()
    setImagePreview(null)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    } else {
      setImagePreview(null)
    }
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-xl mx-auto my-12">
      <h2 className="text-3xl font-semibold text-center text-slate-900 mb-8">Add a New School</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            School Name
          </label>
          <input
            id="name"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
            {...register("name", { required: "School Name is required." })}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-slate-700">
            Address
          </label>
          <input
            id="address"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
            {...register("address", { required: "Address is required." })}
            aria-invalid={!!errors.address}
          />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-slate-700">
            City
          </label>
          <input
            id="city"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
            {...register("city", { required: "City is required." })}
            aria-invalid={!!errors.city}
          />
          {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-slate-700">
            State
          </label>
          <input
            id="state"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
            {...register("state", { required: "State is required." })}
            aria-invalid={!!errors.state}
          />
          {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>}
        </div>

        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-slate-700">
            Contact Number
          </label>
          <input
            id="contact"
            type="tel"
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
            {...register("contact", {
              required: "Contact number is required.",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit number.",
              },
            })}
            aria-invalid={!!errors.contact}
            inputMode="numeric"
            pattern="[0-9]{10}"
          />
          {errors.contact && <p className="mt-1 text-sm text-red-600">{errors.contact.message}</p>}
        </div>

        <div>
          <label htmlFor="email_id" className="block text-sm font-medium text-slate-700">
            Email ID
          </label>
          <input
            id="email_id"
            type="email"
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
            {...register("email_id", {
              required: "Email is required.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: "Invalid email address.",
              },
            })}
            aria-invalid={!!errors.email_id}
          />
          {errors.email_id && <p className="mt-1 text-sm text-red-600">{errors.email_id.message}</p>}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-slate-700">
            School Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            className="mt-1 block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="mt-4 rounded-lg overflow-hidden border border-slate-200">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="School preview"
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors duration-200"
          >
            Add School
          </button>
        </div>
      </form>
    </div>
  )
}

function DetailsModal({
  school,
  onClose,
}: {
  school: School | null
  onClose: () => void
}) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (!school) return
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [school, handleKey])

  if (!school) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${school.name}`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="relative bg-white rounded-xl shadow-xl w-full max-w-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full aspect-video bg-slate-100 overflow-hidden">
          {school.image ? (
            <img src={school.image || "/placeholder.svg"} alt={school.name} className="w-full h-full object-cover" />
          ) : (
            <img src="/school-image-placeholder.png" alt="" aria-hidden="true" className="w-full h-full object-cover" />
          )}
        </div>
        <div className="p-6 space-y-3">
          <h3 className="text-2xl font-semibold text-slate-900">{school.name}</h3>
          <div className="text-slate-700">
            <p>
              <span className="font-medium text-slate-800">Address:</span> {school.address}
            </p>
            <p>
              <span className="font-medium text-slate-800">City:</span> {school.city}
            </p>
            <p>
              <span className="font-medium text-slate-800">State:</span> {school.state}
            </p>
            <p>
              <span className="font-medium text-slate-800">Contact:</span> {school.contact}
            </p>
            <p>
              <span className="font-medium text-slate-800">Email:</span>{" "}
              <a href={`mailto:${school.email_id}`} className="text-blue-600 hover:underline">
                {school.email_id}
              </a>
            </p>
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Close
              <span className="sr-only">Close details dialog</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ShowSchoolsList({
  schools,
  onSelect,
}: {
  schools: School[]
  onSelect: (school: School) => void
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center text-slate-900 mb-8">List of Schools</h2>
      {schools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
          {schools.map((school, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-transform duration-200 hover:scale-105"
            >
              <button
                type="button"
                onClick={() => onSelect(school)}
                className="group w-full aspect-video overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-600"
                aria-label={`Open details for ${school.name}`}
              >
                {school.image ? (
                  <img
                    src={school.image || "/placeholder.svg"}
                    alt={school.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <img
                    src="/school-image-placeholder.png"
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    aria-hidden="true"
                  />
                )}
              </button>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 truncate">{school.name}</h3>
                  <p className="mt-1 text-slate-600 text-sm">{school.address}</p>
                  <p className="text-slate-600 text-sm mt-0.5">{school.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-slate-600 text-lg mt-12">
          No schools have been added yet. Please use the "Add School" page to get started.
        </div>
      )}
    </div>
  )
}

export default function SchoolsApp() {
  const [schools, setSchools] = useState<School[]>([])
  const [currentPage, setCurrentPage] = useState<"add" | "show">("show")
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null)

  const handleAddSchool = (newSchool: School) => {
    setSchools((prev) => [...prev, newSchool])
    setCurrentPage("show")
  }

  useEffect(() => {
    try {
      const saved = typeof window !== "undefined" ? localStorage.getItem("schools") : null
      if (saved) {
        const parsed: School[] = JSON.parse(saved)
        if (Array.isArray(parsed)) setSchools(parsed)
      }
    } catch {
      // ignore parse errors silently
    }
  }, [])

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("schools", JSON.stringify(schools))
      }
    } catch {
      // ignore write errors silently
    }
  }, [schools])

  return (
    <div className="bg-slate-50 min-h-screen font-sans antialiased text-slate-900">
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="pt-8">
        {currentPage === "add" ? (
          <AddSchoolForm onAddSchool={handleAddSchool} />
        ) : (
          <ShowSchoolsList schools={schools} onSelect={(school) => setSelectedSchool(school)} />
        )}
      </main>

      <DetailsModal school={selectedSchool} onClose={() => setSelectedSchool(null)} />
    </div>
  )
}
