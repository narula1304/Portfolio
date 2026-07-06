"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

/**
 * [Architecture §6 animation plan] "Stat counters: Count-up on first view,
 * whileInView once." Counts from 0 to `to` the first time it scrolls into
 * view, then never re-triggers.
 */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
    const motionValue = useMotionValue(0);
    const spring = useSpring(motionValue, { duration: 1.2, bounce: 0 });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (isInView) motionValue.set(to);
    }, [isInView, motionValue, to]);

    useEffect(() => {
        const unsubscribe = spring.on("change", (latest) => {
            setDisplay(Math.round(latest));
        });
        return unsubscribe;
    }, [spring]);

    return (
        <span ref={ref}>
            {display}
            {suffix}
        </span>
    );
}