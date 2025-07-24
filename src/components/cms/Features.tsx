import { useCMS } from '@/context/CmsContentProvider'
import {  PerformanceIcon, ScalableIcon, SecureIcon, } from '../ui/Icons';
 

export const Features: React.FC = () => {
  const { getComponent } = useCMS()
  const componentData = getComponent('feature-grid')
 

  if (!componentData?.attributes) return null
  const items = componentData.attributes.items 
  

   const getDinamycIcon = (iconName: string) => {
 
     switch (iconName) {
       case 'icon-fast-performance':
         return <PerformanceIcon />;
       case 'icon-secure-platform':
         return <SecureIcon />;
       case 'icon-scalable-solution':
         return <ScalableIcon />;
       default:
         return null;
     }
   }

  return (
    <section id="feature-grid" className="py-16 px-4 md:px-10 bg-gray-50">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item: any)  => (
         <div
         id={item.id}
         key={item.id}
         className="bg-white p-8 rounded-lg shadow-md text-center"
       >
         <div className={item.style.wrapperClass}>
          {getDinamycIcon(item.content.icon)}
         </div>
         <h3 className="text-xl font-semibold mb-2">{item.content.title}</h3>
         <p className="text-gray-600">{item.content.description}</p>
       </div>

        ))}
      </div>
    </div>
  </section>
  )
}
