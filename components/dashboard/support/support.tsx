"use client";

import React, { useState } from "react";
import { useFetchInfo } from "@/lib/data/fetchPost";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  faWhatsapp,
  faTelegram,
  faFacebookF,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "sonner";

export default function Support() {
  const { data: deets } = useFetchInfo();
  const data = deets!.data;
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialHandles = [
    {
      name: "WhatsApp",
      className: "bg-green-500/5 text-green-500 border border-green-500/10",
      desc: "Chat with our live team on this platform and get attended to immediately here on Whatsapp",
      icon: (
        <FontAwesomeIcon icon={faWhatsapp} className="text-green-500 w-5 h-5" />
      ),
      link: "https://wa.me/1234567890",
      button: "bg-green-500",
      cta: "Chat on WhatsApp",
    },
    {
      name: "Telegram",
      className: "bg-cyan-500/5 text-cyan-500 border border-cyan-500/10",
      desc: "Chat with our live team on this platform and get attended to immediately here on Telegram",
      button: "bg-cyan-500",
      icon: (
        <FontAwesomeIcon icon={faTelegram} className="text-cyan-500 w-5 h-5" />
      ),
      link: "https://t.me/swiftnexusbksupport",
      cta: "Chat on Telegram",
    },
    {
      name: "Email",
      className: "bg-red-500/5 text-red-500 border border-red-500/10",
      desc: "Reach out to use via email, send us an email about whatever complaint and we'll get back immediately",
      icon: (
        <FontAwesomeIcon icon={faEnvelope} className="text-red-500 w-5 h-5" />
      ),
      link: "mailto:wilsonGroup@usa.com",
      button: "bg-red-500",
      cta: "Send an email",
    },
    {
      name: "Facebook",
      className: "bg-blue-500/5 text-blue-500 border border-blue-500/10",
      desc: "Connect with us on Facebook for updates and support",
      icon: (
        <FontAwesomeIcon icon={faFacebookF} className="text-blue-500 w-5 h-5" />
      ),
      link: "https://www.facebook.com/profile.php?id=100092344946573&mibextid=ZbWKwL",
      button: "bg-blue-500",
      cta: "Visit Facebook Page",
    },
    {
      name: "Twitter",
      className: "bg-sky-500/5 text-sky-500 border border-sky-500/10",
      desc: "Follow us on Twitter for the latest news and support",
      icon: (
        <FontAwesomeIcon icon={faTwitter} className="text-sky-500 w-5 h-5" />
      ),
      link: "https://x.com/swiftnexusbk_",
      button: "bg-sky-500",
      cta: "Follow on Twitter",
    },
    {
      name: "Phone",
      className: "bg-yellow-500/5 text-yellow-500 border border-yellow-500/10",
      desc: "Call our support team directly for immediate assistance",
      icon: (
        <FontAwesomeIcon icon={faPhone} className="text-yellow-500 w-5 h-5" />
      ),
      link: "tel:+16787192288",
      button: "bg-yellow-500",
      cta: "Call us now",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 5000));

    if (navigator.onLine) {
      toast.success("Message sent successfully!");
      setMessage("");
    } else {
      toast.error("Error sending message");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {socialHandles.map((handle) => (
          <div
            key={handle.name}
            className={`${handle.className} p-4 rounded-sm`}
          >
            <div className="">
              <h2 className="text-sm font-medium mb-2 flex items-center gap-x-2">
                {handle.icon}
                {handle.name}
              </h2>
              <div className="desc text-sm my-2 mt-4 dark:text-neutral-300 text-neutral-500 text-medium">
                {handle.desc}
              </div>
              <Button
                asChild
                className={`${handle.button} mt-2 rounded-md hover:${handle.button}`}
              >
                <a href={handle.link} target="_blank" rel="noopener noreferrer">
                  {handle.cta}
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-neutral-50/50 dark:bg-neutral-900 p-4 rounded-md"
      >
        <div className="heading pb-6">
          <div className="text-xl font-semibold text-neutral-600 dark:text-neutral-300">
            {"What's your message?"}
          </div>
          <div className="text-neutral-500 text-sm font-medium dark:text-neutral-400">
            {
              "Leave a message in the box below to reach out to our support team, "
            }
            <br />
            {"we'll get back to you via email as soon as possible"}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="First Name"
              defaultValue={data?.firstName || ""}
              disabled
              className="bg-neutral-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Last Name"
              defaultValue={data?.lastName || ""}
              disabled
              className="bg-neutral-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Email"
              defaultValue={data?.email || ""}
              disabled
              className="bg-neutral-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="Phone"
              defaultValue={data?.phone || ""}
              disabled
              className="bg-neutral-100"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Your Message</Label>
          <Textarea
            id="message"
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="w-full bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-800"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !message}
          className="w-full"
        >
          {isSubmitting ? "Sending..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
