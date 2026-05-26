import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const colleges = [
  {
    name: "Indian Institute of Technology Delhi",
    slug: "iit-delhi",
    image: "https://wallpaperaccess.com/full/8410993.jpg",
    location: "Hauz Khas, New Delhi",
    city: "New Delhi",
    state: "Delhi",
    type: "Government",
    rating: 4.8,
    reviewCount: 342,
    fees: 225000,
    established: 1961,
    overview:
      "IIT Delhi is one of the premier engineering institutes in India, known for its cutting-edge research and world-class faculty. The institute offers undergraduate, postgraduate, and doctoral programs across various engineering and science disciplines.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 225000, seats: 120 },
      { name: "B.Tech Electrical Engineering", duration: "4 years", fees: 225000, seats: 110 },
      { name: "M.Tech Data Science", duration: "2 years", fees: 200000, seats: 60 },
    ],
    placements: [
      {
        year: 2024,
        averagePackage: 2100000,
        highestPackage: 27500000,
        placementRate: 95,
        topRecruiters: "Google,Microsoft,Amazon,Goldman Sachs,Uber",
      },
    ],
  },
  {
    name: "Indian Institute of Technology Bombay",
    slug: "iit-bombay",
    location: "Powai, Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Government",
    rating: 4.9,
    reviewCount: 456,
    fees: 230000,
    established: 1958,
    overview:
      "IIT Bombay is consistently ranked among the top engineering institutions globally. Located in the scenic Powai area, it offers a vibrant campus life alongside rigorous academics.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 230000, seats: 150 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", fees: 230000, seats: 140 },
      { name: "M.Tech AI & ML", duration: "2 years", fees: 210000, seats: 50 },
    ],
    placements: [
      {
        year: 2024,
        averagePackage: 2300000,
        highestPackage: 31000000,
        placementRate: 97,
        topRecruiters: "Google,Apple,Microsoft,Morgan Stanley,JPMorgan",
      },
    ],
  },
  {
    name: "BITS Pilani",
    slug: "bits-pilani",
    location: "Vidya Vihar, Pilani",
    city: "Pilani",
    state: "Rajasthan",
    type: "Private",
    rating: 4.6,
    reviewCount: 289,
    fees: 520000,
    established: 1964,
    overview:
      "BITS Pilani is a premier private engineering institution known for its flexible academic structure and strong industry connections. The Practice School program is unique.",
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", fees: 520000, seats: 200 },
      { name: "B.E. Electronics", duration: "4 years", fees: 520000, seats: 180 },
      { name: "M.E. Software Systems", duration: "2 years", fees: 480000, seats: 40 },
    ],
    placements: [
      {
        year: 2024,
        averagePackage: 1850000,
        highestPackage: 18000000,
        placementRate: 92,
        topRecruiters: "Microsoft,Google,Sprinklr,Samsung,Oracle",
      },
    ],
  },
  {
    name: "Delhi Technological University",
    slug: "dtu-delhi",
    location: "Shahbad Daulatpur, Delhi",
    city: "New Delhi",
    state: "Delhi",
    type: "Government",
    rating: 4.3,
    reviewCount: 567,
    fees: 175000,
    established: 1941,
    overview:
      "Formerly Delhi College of Engineering, DTU is one of the oldest and most reputed engineering colleges in India with a strong alumni network.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 175000, seats: 180 },
      { name: "B.Tech Information Technology", duration: "4 years", fees: 175000, seats: 120 },
      { name: "MBA", duration: "2 years", fees: 200000, seats: 100 },
    ],
    placements: [
      {
        year: 2024,
        averagePackage: 1400000,
        highestPackage: 15000000,
        placementRate: 88,
        topRecruiters: "Adobe,Paytm,Zomato,Flipkart,Samsung",
      },
    ],
  },
  {
    name: "VIT Vellore",
    slug: "vit-vellore",
    location: "Vellore",
    city: "Vellore",
    state: "Tamil Nadu",
    type: "Private",
    rating: 4.2,
    reviewCount: 892,
    fees: 380000,
    established: 1984,
    overview:
      "VIT is a leading private university known for its modern infrastructure, diverse student body, and strong placement record across various sectors.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 380000, seats: 500 },
      { name: "B.Tech ECE", duration: "4 years", fees: 360000, seats: 400 },
      { name: "M.Tech Cybersecurity", duration: "2 years", fees: 300000, seats: 60 },
    ],
    placements: [
      {
        year: 2024,
        averagePackage: 850000,
        highestPackage: 8500000,
        placementRate: 85,
        topRecruiters: "TCS,Infosys,Wipro,Cognizant,Capgemini",
      },
    ],
  },
  {
    name: "NIT Trichy",
    slug: "nit-trichy",
    location: "Tiruchirappalli",
    city: "Tiruchirappalli",
    state: "Tamil Nadu",
    type: "Government",
    rating: 4.5,
    reviewCount: 234,
    fees: 150000,
    established: 1964,
    overview:
      "NIT Trichy is one of the top NITs in India, known for its academic excellence and beautiful campus. It has produced numerous successful engineers and entrepreneurs.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 150000, seats: 90 },
      { name: "B.Tech Civil Engineering", duration: "4 years", fees: 150000, seats: 80 },
      { name: "M.Tech VLSI", duration: "2 years", fees: 125000, seats: 30 },
    ],
    placements: [
      {
        year: 2024,
        averagePackage: 1200000,
        highestPackage: 12000000,
        placementRate: 91,
        topRecruiters: "Intel,Qualcomm,Texas Instruments,Amazon,Microsoft",
      },
    ],
  },
  {
    name: "SRM Institute of Science and Technology",
    slug: "srm-chennai",
    location: "Kattankulathur, Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "Private",
    rating: 4.0,
    reviewCount: 678,
    fees: 350000,
    established: 1985,
    overview:
      "SRMIST is one of the largest private universities in India with a sprawling campus and modern facilities. Known for its diverse programs and international collaborations.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 350000, seats: 600 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", fees: 320000, seats: 400 },
      { name: "BBA", duration: "3 years", fees: 200000, seats: 200 },
    ],
    placements: [
      {
        year: 2024,
        averagePackage: 700000,
        highestPackage: 4500000,
        placementRate: 80,
        topRecruiters: "TCS,Infosys,HCL,Tech Mahindra,CTS",
      },
    ],
  },
  {
    name: "IIT Madras",
    slug: "iit-madras",
    location: "Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "Government",
    rating: 4.9,
    reviewCount: 389,
    fees: 220000,
    established: 1959,
    overview:
      "IIT Madras is ranked #1 in India for engineering and is known for its research parks, startup ecosystem, and beautiful deer-filled campus.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 220000, seats: 100 },
      { name: "B.Tech Data Science", duration: "4 years", fees: 220000, seats: 80 },
      { name: "M.Tech Quantum Computing", duration: "2 years", fees: 200000, seats: 25 },
    ],
    placements: [
      {
        year: 2024,
        averagePackage: 2400000,
        highestPackage: 32000000,
        placementRate: 98,
        topRecruiters: "Google,Microsoft,Apple,Meta,Nvidia",
      },
    ],
  },
  {
    name: "Manipal Institute of Technology",
    slug: "mit-manipal",
    location: "Manipal",
    city: "Manipal",
    state: "Karnataka",
    type: "Private",
    rating: 4.3,
    reviewCount: 445,
    fees: 450000,
    established: 1957,
    overview:
      "MIT Manipal is a top private engineering college known for its scenic campus, student life, and strong alumni network across the globe.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 450000, seats: 300 },
      { name: "B.Tech Biotechnology", duration: "4 years", fees: 420000, seats: 100 },
      { name: "M.Tech Robotics", duration: "2 years", fees: 380000, seats: 40 },
    ],
    placements: [
      {
        year: 2024,
        averagePackage: 1100000,
        highestPackage: 9500000,
        placementRate: 87,
        topRecruiters: "Goldman Sachs,JP Morgan,Amazon,SAP,VMware",
      },
    ],
  },
  {
    name: "College of Engineering Pune",
    slug: "coep-pune",
    location: "Shivajinagar, Pune",
    city: "Pune",
    state: "Maharashtra",
    type: "Government",
    rating: 4.4,
    reviewCount: 312,
    fees: 125000,
    established: 1854,
    overview:
      "COEP is one of the oldest engineering colleges in Asia, with a rich heritage and strong academic tradition. The riverfront campus is iconic.",
    courses: [
      { name: "B.Tech Computer Engineering", duration: "4 years", fees: 125000, seats: 80 },
      { name: "B.Tech Electronics", duration: "4 years", fees: 125000, seats: 70 },
      { name: "M.Tech Signal Processing", duration: "2 years", fees: 100000, seats: 25 },
    ],
    placements: [
      {
        year: 2024,
        averagePackage: 1300000,
        highestPackage: 14500000,
        placementRate: 90,
        topRecruiters: "Nvidia,AMD,Qualcomm,Microsoft,Google",
      },
    ],
  },
];

async function main() {
  console.log("Seeding database...");

  for (const collegeData of colleges) {
    const { courses, placements, ...college } = collegeData;

    const createdCollege = await prisma.college.upsert({
  where: { slug: college.slug },
  update: { 
    ...college,
    courses: { deleteMany: {}, create: courses },
    placements: { deleteMany: {}, create: placements },
  },
  create: {
    ...college,
    courses: { create: courses },
    placements: { create: placements },
  },
});

    console.log(`Created: ${createdCollege.name}`);
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
