"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import QR from "qrcode";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const small = { width: 400, height: 400 };
const medium = { width: 800, height: 800 };
const large = { width: 1200, height: 1200 };
const xl = { width: 1600, height: 4160 };
const xxl = { width: 2000, height: 4020 };

export default function Home() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [showImg, setShowImg] = useState(false);
  const [source, setSource] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  const generate = async () => {
    if (!link || !name) {
      toast("Please provide required information");
    } else {
      try {
        const sizeOptions = {
          small,
          medium,
          large,
          xl,
          xxl,
        };
        const dataUrl = await QR.toDataURL(link, sizeOptions[selectedSize]);
        setSource(dataUrl);
        setShowImg(true);
        toast("QR CODE GENERATED SUCCESSFULLY 😎");
      } catch (error) {
        toast("Error generating QR code");
        console.error("Error generating QR code:", error);
      }
    }
  };

  const handleDownload = () => {
    if (!imageUrl && !name) {
      toast("Please generate a QR code first");
      return;
    }

    const downloadLink = document.createElement("a");
    downloadLink.href = imageUrl;
    downloadLink.download = name || "qrcode";
    downloadLink.click();
  };

  useEffect(() => {
    if (source) {
      setImageUrl(source);
    }
  }, [source]);

  return (
    <main>
      <Toaster />
      <div className="left">
        <h1>Convert your links to QR codes.</h1>
        <form>
          <Label>
            Link:
            <Input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="paste your link"
            />
          </Label>
          <Label>
            Name:
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="specify the name"
            />
          </Label>
          <div className="select">
            {/* <Label>Select the size of the image you want to generate</Label> */}
            <Select
              onValueChange={(value) => setSelectedSize(value)}
              value={selectedSize}
              defaultValue="small"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    Select the size of the image you want to generate
                  </SelectLabel>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="xl">X Large</SelectItem>
                  <SelectItem value="xxl">XX Large</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button type="button" onClick={() => generate()}>
            CONVERT 🔄
          </Button>
        </form>
      </div>
      <div className="right">
        {showImg && (
          <>
            <Image src={source} alt="" width={300} height={300} />
            <Button onClick={handleDownload}>Download - 📥</Button>
          </>
        )}
      </div>
    </main>
  );
}
