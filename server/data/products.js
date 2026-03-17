const products = [
  {
    name: "Gaming Laptop Pro",
    price: 85000,
    description: "High performance RTX 3060 gaming laptop with 16GB RAM",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
    countInStock: 10
  },
  {
    name: "Wireless Headphones Elite",
    price: 7500,
    description: "Noise-cancelling Bluetooth headphones with 30hr battery",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    countInStock: 20
  },
  {
    name: "Smartphone X Pro",
    price: 42000,
    description: "Latest 5G smartphone with 256GB storage and 108MP camera",
    image: "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=300&fit=crop",
    countInStock: 15
  },
  {
    name: "Smart Watch Fitness",
    price: 9500,
    description: "Fitness tracking smartwatch with heart rate monitor and GPS",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    countInStock: 25
  },
  {
    name: "Bluetooth Speaker Pro",
    price: 5500,
    description: "Premium portable speaker with 360° sound and deep bass",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
    countInStock: 30
  },
  {
    name: "4K Webcam Ultra",
    price: 8900,
    description: "Professional 4K webcam perfect for streaming and calls",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop",
    countInStock: 12
  },
  {
    name: "Mechanical Keyboard RGB",
    price: 6200,
    description: "Mechanical gaming keyboard with RGB lighting and switches",
    image: "https://images.unsplash.com/photo-1587829191301-26d61b60342b?w=400&h=300&fit=crop",
    countInStock: 18
  },
  {
    name: "Wireless Mouse Gaming",
    price: 3500,
    description: "Ergonomic wireless gaming mouse with precision tracking",
    image: "https://images.unsplash.com/photo-1527814151519-7cbfaf69a2ad?w=400&h=300&fit=crop",
    countInStock: 35
  },
  {
    name: "USB-C Hub Adapter",
    price: 2800,
    description: "7-in-1 USB-C hub with HDMI, SD card reader and charging",
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop",
    countInStock: 40
  },
  {
    name: "Portable SSD 1TB",
    price: 12000,
    description: "Ultra-fast portable SSD with 1TB storage and USB 3.1",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop",
    countInStock: 22
  },
  {
    name: "Phone Stand Adjustable",
    price: 1200,
    description: "Premium aluminum phone stand compatible with all devices",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
    countInStock: 50
  },
  {
    name: "Charging Cable Pro",
    price: 800,
    description: "Durable 2m fast-charging cable with reinforced connectors",
    image: "https://images.unsplash.com/photo-1621819266257-cfc5e36c5a72?w=400&h=300&fit=crop",
    countInStock: 100
  },
  {
    name: "Tablet Pro 12.9",
    price: 65000,
    description: "Ultra-thin 12.9 inch tablet with stylus and premium display",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3af4abd8?w=400&h=300&fit=crop",
    countInStock: 8
  },
  {
    name: "Drone Aerial Camera",
    price: 45000,
    description: "Professional 4K drone with 30min flight time and AI tracking",
    image: "https://images.unsplash.com/photo-1608889335941-32ac5f2941c7?w=400&h=300&fit=crop",
    countInStock: 6
  },
  {
    name: "Smart TV 55 inch",
    price: 55000,
    description: "55-inch 4K smart TV with HDR and built-in streaming apps",
    image: "https://images.unsplash.com/photo-1467011073230-28f4c67ce87f?w=400&h=300&fit=crop",
    countInStock: 5
  },
  {
    name: "Wireless Charging Pad",
    price: 2500,
    description: "Fast wireless charging pad compatible with all Qi devices",
    image: "https://images.unsplash.com/photo-1591290621749-2142e09a9e9a?w=400&h=300&fit=crop",
    countInStock: 60
  },
  {
    name: "Gaming Monitor 144Hz",
    price: 28000,
    description: "27-inch 144Hz gaming monitor with 1ms response time",
    image: "https://images.unsplash.com/photo-1592286927505-1fed6c3d02f5?w=400&h=300&fit=crop",
    countInStock: 9
  },
  {
    name: "USB Flash Drive 256GB",
    price: 3200,
    description: "High-speed 256GB USB 3.1 flash drive with fast transfer rates",
    image: "https://images.unsplash.com/photo-1597872108969-2b1c28f9dadf?w=400&h=300&fit=crop",
    countInStock: 45
  },
  {
    name: "Laptop Cooling Pad",
    price: 3500,
    description: "Ergonomic cooling pad with adjustable height and quiet fans",
    image: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=400&h=300&fit=crop",
    countInStock: 32
  },
  {
    name: "Microphone Studio Pro",
    price: 12500,
    description: "Professional studio microphone with built-in shock mount",
    image: "https://images.unsplash.com/photo-1590479773091-386ca35d46d4?w=400&h=300&fit=crop",
    countInStock: 14
  },
  {
    name: "Ring Light Photography",
    price: 4800,
    description: "9.6 inch ring light with tripod stand for streaming and content",
    image: "https://images.unsplash.com/photo-1598935706802-2d391e8fbb9a?w=400&h=300&fit=crop",
    countInStock: 28
  },
  {
    name: "Power Bank 50000mAh",
    price: 4200,
    description: "Super fast charging power bank with dual USB and Type-C ports",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop",
    countInStock: 55
  }
];

module.exports = products;