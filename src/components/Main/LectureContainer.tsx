"use client";

import React from "react";
import { LectureCard } from "./LectureCard";
import { Link } from "lucide-react";

export const LectureContainer = () => {
  const lectureList = [
    {
      id: 1,
      title: "테스트",
      image_url:
        "https://artinfokorea.com/_next/image?url=https%3A%2F%2Fycuajmirzlqpgzuonzca.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fartinfo%2Fconcert%2F1703601013947.webp&w=256&q=100",
    },
    {
      id: 2,
      title: "테스트",
      image_url:
        "https://artinfokorea.com/_next/image?url=https%3A%2F%2Fycuajmirzlqpgzuonzca.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fartinfo%2Fconcert%2F1703601013947.webp&w=256&q=100",
    },
    {
      id: 3,
      title: "테스트",
      image_url:
        "https://artinfokorea.com/_next/image?url=https%3A%2F%2Fycuajmirzlqpgzuonzca.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fartinfo%2Fconcert%2F1703601013947.webp&w=256&q=100",
    },
    {
      id: 4,
      title: "테스트",
      image_url:
        "https://artinfokorea.com/_next/image?url=https%3A%2F%2Fycuajmirzlqpgzuonzca.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fartinfo%2Fconcert%2F1703601013947.webp&w=256&q=100",
    },
    {
      id: 5,
      title: "테스트",
      image_url:
        "https://artinfokorea.com/_next/image?url=https%3A%2F%2Fycuajmirzlqpgzuonzca.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fartinfo%2Fconcert%2F1703601013947.webp&w=256&q=100",
    },
    {
      id: 6,
      title: "테스트",
      image_url:
        "https://artinfokorea.com/_next/image?url=https%3A%2F%2Fycuajmirzlqpgzuonzca.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fartinfo%2Fconcert%2F1703601013947.webp&w=256&q=100",
    },
    {
      id: 7,
      title: "테스트",
      image_url:
        "https://artinfokorea.com/_next/image?url=https%3A%2F%2Fycuajmirzlqpgzuonzca.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fartinfo%2Fconcert%2F1703601013947.webp&w=256&q=100",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 px-2">
      {lectureList.map((lecture) => (
        <LectureCard lecture={lecture} key={lecture.id} />
      ))}
    </div>
  );
};
