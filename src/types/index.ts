export type Footer = {
  id: string
  type: 'footer'
  attributes: {
    text: {
      copyright: string
    }
    content: {
      socialLinks: {
        icon: string
        platform: string
        url: string
      }[]
    }
  }
}

export type HeroBanner = {
  id:string
  type: 'hero_banner'
  attributes: {
    background: {
      type: string
      img?: {
        src: string
        alt: string
      }
      overlay?: {
        color: string
        enabled: boolean
      }
    }
    content: {
      title: {
        text: string
        style: {
          fontSize: string
          color: string
          fontWeight?: string
        }
      }
      subtitle: {
        text: string
        style: {
          fontSize: string
          color: string
          fontWeight?: string
        }
      }
    }
  }

}

export type ContactsForm= {
  id: string
  type: 'contacts_form'
  attributes: {
    fields: []
    submission: {
      endpoint: string
      method: string
      successMessage: string
      errorMessage: string
    }
  }
}

export type FeaturesGrid= {
  id: string
  type: 'feature_grid'
  attributes: {
    layout: {
      columns: number
      gap: string
      padding: string
    }
    items: Array<{
      id: string
      content: {
        title: string
        description: string
        alignment: string
        icon: string
      }
    }>
  }
}

export type CMSComponent = 
  | Footer 
  | HeroBanner 
  | ContactsForm 
  | FeaturesGrid;

 

export type CMSContextType = {
  components: CMSComponent[];
  getComponent: (id: string) => any;
}