 
import { CMSContextType,   CMSComponent } from '@/types';
import { createContext, useContext, ReactNode, useMemo } from 'react'



const CMSContext = createContext<CMSContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
  components: CMSComponent[];
}

export function CmsContentProvider({ children,  components }: Props) {

  const getComponent = (id: string) => components?.find(component => component.id === id)

  const value = useMemo(() => ({
    components: components,
    getComponent,
  }), [components, getComponent]);

  return (
    <CMSContext.Provider value={value}>
      {children}
    </CMSContext.Provider>
  )
}

export function useCMS() {
  const context = useContext(CMSContext)
  if (!context) {
    throw new Error('useCMS must be used within a CmsContentProvider');
  }
  return context
}