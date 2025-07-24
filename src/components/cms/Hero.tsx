import { useCMS } from '@/context/CmsContentProvider'

export const Hero: React.FC = () => {
  const { getComponent } = useCMS()
  const componentData = getComponent('hero-banner')

  if (!componentData) return null

  const backGround = componentData?.attributes.background
  const title = componentData?.attributes.content.title
  const subtitle = componentData?.attributes.content.subtitle
  const cta = componentData?.attributes.content.cta

  return (
    <section id="hero-section" className="relative py-20 flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img
          src={backGround?.img?.src}
          alt={backGround?.img?.alt ?? 'Hero Background'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-700 bg-opacity-50"></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <h1
          className="text-5xl md:text-6xl font-bold text-white mb-4"
          style={{
            fontSize: subtitle.style.fontSize,
            color: subtitle.style.color,
            fontWeight: subtitle.style.fontWeight || 'normal',
          }}
        >
          {title.text}
        </h1>
        <p
          className="text-2xl text-gray-100"
          style={{
            fontSize: subtitle.style.fontSize,
            color: subtitle.style.color,
            fontWeight: subtitle.style.fontWeight || 'normal',
          }}
        >
          {subtitle.text}
        </p>
        <button className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300">
          {cta.text}
        </button>
      </div>
    </section>
  )
}
