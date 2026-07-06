import { Heading } from "@/components/atoms/Heading";
import { TimelineNode } from "@/components/molecules/TimelineNode";
import { timeline } from "@/data/timeline";

export function ExperienceTimeline() {
    return (
        <section id="timeline" className="mx-auto max-w-3xl px-6 py-24 md:py-32">
            <div className="mb-10">
                <p className="mb-3 font-mono text-sm text-muted-foreground">04 / Timeline</p>
                <Heading as="h2" size="h1">
                    My programming journey.
                </Heading>
            </div>

            <div>
                {timeline.map((entry, index) => (
                    <TimelineNode
                        key={entry.title}
                        date={entry.date}
                        title={entry.title}
                        description={entry.description}
                        isLast={index === timeline.length - 1}
                    />
                ))}
            </div>
        </section>
    );
}