import GenerateEndpoint from "@/src/components/generate-endpoint"

const Page = () => {
  return (
    <main className="min-h-screen w-full bg-white relative isolate">
      {/* Purple Gradient Grid Right Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f0f0f0 1px, transparent 1px),
            linear-gradient(to bottom, #f0f0f0 1px, transparent 1px),
            radial-gradient(circle 800px at 100% 200px, #d5c5ff, transparent)
          `,
          backgroundSize: "96px 64px, 96px 64px, 100% 100%",
        }}
      />

      <div className="relative z-10 pt-32 px-3">
        <GenerateEndpoint />
      </div>
    </main>
  )
}

export default Page