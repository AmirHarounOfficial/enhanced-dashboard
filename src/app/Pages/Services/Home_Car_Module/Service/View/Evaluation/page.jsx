"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function EvaluationPage({ handleClose, service }) {
  const { t } = useTranslation();

  const [expandedIndexes, setExpandedIndexes] = useState({});

  const toggleExpanded = (index) => {
    setExpandedIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const maxLength = 90;

  return (
    <>
      <section className="px-6 mb-4">
        <div className="px-4 py-3 border border-[#FEC84B] bg-[#FFFAEB] rounded-[10px] text-[#202939] text-base font-normal">
          {t(
            "To view customer reviews to enable them to improve and raise the efficiency of service performance and obtain more orders"
          )}
        </div>
      </section>

      {service?.ratings?.map((rating, index) => {
        const text = rating?.review || "";
        const isLong = text.length > maxLength;
        const shortText = text.slice(0, maxLength);
        const expanded = expandedIndexes[index] || false;

        return (
          <section className="px-6 mb-4" key={rating.id || index}>
            <div className="border-b border-[#E3E8EF]">
              <div className="flex justify-between">
                <div className="flex mb-4 gap-3">
                  <p className="bg-[#C69815]/20 text-[#C69815] w-10 h-10 flex justify-center items-center rounded-full p-2 mt-2">
                    {rating?.user?.name ? rating.user.name.charAt(0) : ""}
                  </p>
                  <div className="flex flex-col gap-1">
                    <p className="text-[#364152] text-base font-medium">
                      {rating?.user?.name} {rating?.user?.lastname}
                    </p>
                    <p className="text-[#697586] text-sm font-normal">
                      {rating?.created_at
                        ? new Date(rating.created_at).toLocaleDateString("en-GB")
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 items-center">
                  <img
                    src="images/icons/star.svg"
                    alt=""
                    className="w-4 h-4 mt-0.5"
                  />
                  <p className="text-[#FDB022] text-sm font-medium">
                    {rating?.rating}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-4 text-[#4B5565] text-sm font-normal">
                  {expanded || !isLong ? text : shortText + "... "}
                  {isLong && (
                    <span
                      onClick={() => toggleExpanded(index)}
                      className="text-[var(--color-primary)] text-sm font-normal cursor-pointer"
                    >
                      {expanded ? t("Show less") : t("Read more")}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </section>
        );
      })}

      <div className="w-full h-px bg-[#CDD5DF]"></div>

      <div className="px-6 mt-5 mb-3">
        <button
          onClick={handleClose}
          className="border border-[#C69815] text-[#C69815] h-11 w-40 rounded-[6px] text-base font-medium"
        >
          {t("cancel")}
        </button>
      </div>
    </>
  );
}

export default EvaluationPage;






