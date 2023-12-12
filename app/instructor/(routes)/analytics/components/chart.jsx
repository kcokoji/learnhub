"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { Card } from "@/components/ui/card";
import Heading from "@/components/Heading";

export const Chart = ({ data }) => {
  if (!data || data.length === 0) {
    // Display a message when there is no data
    return (
      <Card>
        <div className="h-[70vh] flex justify-center items-center">
          <Heading title="No Records Found" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-3">
      <ResponsiveContainer width="100%" height={430}>
        <BarChart data={data}>
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={true}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={true}
            tickFormatter={(value) => `₦${value}`}
          />

          <Bar dataKey="total" fill="#f97316" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
