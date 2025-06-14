"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function PerformanceCard({ assessments }) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (assessments) {
        const formattedData = assessments.map((assessment) => ({
            date: format(new Date(assessment.createdAt), "MM dd"),
            score: assessment.quizScore,
        }));
        setChartData(formattedData);
        }
    }, [assessments]);

  return (
    <Card>
        <CardHeader>
            <CardTitle className="gradient-title text-2xl md:text-3xl ">
                Performance Overview
            </CardTitle>
            <CardDescription>Your Quiz Performance over time</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="h-[300px] ">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartData}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="bg-muted p-2 border border-gray-300 rounded">
                                        <p className="text-sm">{`Date: ${payload[0].payload.date}`}</p>
                                        <p className="text-sm">{`Score: ${payload[0].value}`}</p>
                                    </div>
                                );
                            }
                            return null;
                        }} />
                        <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#8884d8"
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
);
}

export default PerformanceCard;
