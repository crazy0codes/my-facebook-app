import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

const FacebookInsightsDashboard = () => {
  const [since, setSince] = useState(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
  const [until, setUntil] = useState(new Date());

  let user = {
    name: "John Doe",
    picture: {
      data: {
        url: null,
      },
    },
  };


  let pages = [
    {
      id: "1",
      name: "Page 1",
    },
    {
      id: "2",
      name: "Page 2",
    },
  ]; 

  let insights = {
    page_fans: 1000,
    page_engagement: 2000,
    page_impressions: 3000,
    page_reactions_total: 4000,
  };



  return (
    <div className="p-8">
      {user && (
        <div className="flex items-center mb-8">
          <img src={user.picture.data.url} alt={user.name} className="w-12 h-12 rounded-full mr-4" />
          <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
        </div>
      )}

      <div className="mb-8">
        <Select >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a page" />
          </SelectTrigger>
          <SelectContent>
            {pages.map((page) => (
              <SelectItem key={page.id} value={page.id}>{page.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex space-x-4 mb-8">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(since, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={since}
              onSelect={setSince}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(until, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={until}
              onSelect={setUntil}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {insights && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Followers / Fans</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{insights.page_fans}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{insights.page_engagement}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Impressions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{insights.page_impressions}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Reactions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{insights.page_reactions_total}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
export default FacebookInsightsDashboard;