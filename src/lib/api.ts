import { Tag } from "@/components/SmartTagInput/types";

const allTags: Tag[] = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Home Goods" },
  { id: 3, name: "Apparel" },
  { id: 4, name: "Books" },
  { id: 5, name: "Sports & Outdoors" },
  { id: 6, name: "Health & Beauty" },
  { id: 7, name: "Automotive" },
  { id: 8, name: "Toys & Games" },
  { id: 9, name: "Pet Supplies" },
  { id: 10, name: "Jewelry" },
  { id: 11, name: "Computers & Accessories" },
  { id: 12, name: "Smart Home Devices" },
  { id: 13, name: "Gaming Consoles" },
  { id: 14, name: "Kitchen Appliances" },
  { id: 15, name: "Fitness Equipment" },
  { id: 16, name: "Gardening Tools" },
  { id: 17, name: "Baby Products" },
  { id: 18, name: "Musical Instruments" },
  { id: 19, name: "Office Supplies" },
  { id: 20, name: "Food & Groceries" }
];

export const fetchTags = async (query: string): Promise<Tag[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = allTags.filter((tag) =>
        tag.name.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filtered.slice(0, 7));
    }, 300);
  });
};
