/**
 * Structured facts about Prince, reused across Hero/About/Contact so
 * name/title/bio never drift out of sync (Architecture §4).
 */

export const profile = {
    role: "Full Stack Developer · Backend Engineer",
    availability: "Open to SDE internships",
    heroWords: ["Prince", "Narula"],
    heroSubtitle:
        "Full stack and backend engineer building real-time systems, developer tools, and AI-driven products.",

    bio: [
        "I'm a B.Tech Computer Science student at IIITDM Jabalpur, focused on backend engineering and distributed systems. I care most about the parts of a product users never see directly — the real-time infrastructure, job queues, and data layer that make everything else feel instant.",
        "Most of what I build starts from a real, specific problem: a campus with no fast way to report incidents, a communication gap for the deaf and hard-of-hearing, a lack of a single place to track internships and hackathons. I'd rather ship something narrow and real than something broad and generic.",
    ],

    philosophy:
        "Good backend systems are boring in the best way — predictable, observable, and easy to reason about under load. I optimize for that before I optimize for cleverness.",

    currentFocus: [
        "Real-time systems with Socket.IO and Redis Pub/Sub",
        "Background job design with BullMQ",
        "Applied ML for accessibility (sign language translation)",
        "System design fundamentals and distributed systems",
    ],

    education: {
        degree: "B.Tech, Computer Science",
        institution: "IIITDM Jabalpur",
    },

    interests: [
        "Backend Development",
        "Distributed Systems",
        "AI & Machine Learning",
        "Developer Tools",
        "System Design",
        "Cloud Computing",
        "Competitive Programming",
    ],
} as const;