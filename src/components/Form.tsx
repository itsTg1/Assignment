"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { downloadPDF } from "@/utils/downloadPDF";
import PDFDocument from "../components/PDFDocument";
import Image from "next/image";
import { useRef } from "react";

export default function FormComponent() {
  const router = useRouter();
  const downloadClicked = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormSchema) => {
    if (downloadClicked.current) {
      // Download flow
      await downloadPDF(data);
    } else {
      // View flow
      router.push(`/preview?data=${encodeURIComponent(JSON.stringify(data))}`);
    }
  };

  const data = watch();

  const fieldConfig = [
    { name: "name", icon: "/user.svg", placeholder: "e.g. John Doe" },
    { name: "email", icon: "/mail.svg", placeholder: "e.g. Johndoe@gmail.com" },
    { name: "phone", icon: "/phone-call.svg", placeholder: "e.g. (220) 222 -20002" },
    { name: "position", icon: "/position.svg", placeholder: "e.g. Junior Front end Developer" },
    { name: "description", icon: "/Description.svg", placeholder: "e.g. Work experiences" },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-4 flex flex-col gap-6"
    >
      {fieldConfig.map(({ name, icon, placeholder }) => (
        <div key={name} className="flex flex-col gap-2">
          <label className="font-bold text-gray-700 capitalize">
            {name === "phone" ? "Phone Number" : name}
          </label>
          <div className="relative">
            <div className={`absolute left-3 ${name === "description" ? "top-3" : "top-1/2 transform -translate-y-1/2"}`}>
              <Image src={icon} alt={name} width={20} height={20} />
            </div>
            {name === "description" ? (
              <textarea
                {...register(name as keyof FormSchema)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent resize-none"
                placeholder={placeholder}
                rows={2}
              />
            ) : (
              <input
                {...register(name as keyof FormSchema)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                placeholder={placeholder}
              />
            )}
          </div>
          {errors[name as keyof FormSchema] && (
            <p className="text-red-500 text-sm">
              {errors[name as keyof FormSchema]?.message}
            </p>
          )}
        </div>
      ))}

      <div className="flex gap-4 mt-6">
        <button
          type="submit"
          onClick={() => (downloadClicked.current = false)}
          className="flex-1 cursor-pointer bg-gradient-to-r from-[#064409] via-[#104812] to-[#527655] text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:from-[#527655] hover:via-[#527655] hover:to-[#527655] transition-all duration-200 font-bold"
        >
          <Image src="/view.svg" alt="View" width={20} height={20} />
          View PDF
        </button>

        <button
          type="submit"
          onClick={() => (downloadClicked.current = true)}
          className="flex-1 cursor-pointer bg-gradient-to-r from-[#527655] via-[#104812] to-[#064409] text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:from-[#527655] hover:via-[#527655] hover:to-[#527655] transition-all duration-200 font-bold"
        >
          <Image src="/Download.svg" alt="Download" width={20} height={20} />
          Download PDF
        </button>
      </div>
    </form>
  );
}
