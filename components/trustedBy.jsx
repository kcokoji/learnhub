const stats = [
  { id: 1, name: "Learners", value: "5000+" },
  { id: 2, name: "Seconds spent learning", value: "9 Million+" },
  { id: 3, name: "Countries", value: "45+" },
];

export default function TrustedBy() {
  return (
    <div className="py-16 sm:py-20 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className="text-base leading-7 text-secondary-foreground">
                {stat.name}
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-secondary-foreground sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
