"use client";
import { useTranslation } from "react-i18next";
import React, { useEffect, Suspense } from "react";
import MainLayout from "@/app/Components/MainLayout/MainLayout";
import Link from "next/link";
import EditInfoDataPage from "./EditInfoData/page";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { getWorkerByIdThunk } from "@/redux/slice/Workers/WorkersSlice";
import Loader from "@/app/Components/Loader/Loader";

function EditPageContent() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { worker, loading } = useSelector((state) => state.workers);

  useEffect(() => {
    if (id) dispatch(getWorkerByIdThunk(id));
  }, [id]);

  return (
    <MainLayout>
      <div className="flex flex-col">
        <section className="page-hero flex justify-between items-center gap-4 flex-wrap mb-6">
          <div>
            <p className="text-[#364152] text-xl font-semibold leading-tight">{t("Worker details")}</p>
            <p className="text-[#697586] text-sm mt-0.5">
              {t("Review and edit employee data easily to maintain accurate and up-to-date information.")}
            </p>
          </div>
          <Link
            href="/Pages/workers"
            className="flex items-center justify-center border border-[var(--color-primary)] rounded-[6px] text-[var(--color-primary)] text-sm font-medium cursor-pointer h-11 px-5
                       transition-colors duration-150 hover:bg-[#C69815]/5 active:scale-[0.97]"
          >
            {t('Return to the workers page')}
          </Link>
        </section>

        <section className="mb-6">
          <EditInfoDataPage worker={worker} loading={loading} />
        </section>
      </div>
    </MainLayout>
  );
}

function EditPage() {
  return (
    <Suspense fallback={<Loader />}>
      <EditPageContent />
    </Suspense>
  );
}

export default EditPage;
