import { useCMS } from '@/context/CmsContentProvider'
import { FacebookIcon, LinkedinIcon, TwitterIcon } from '../ui/Icons';

interface SocialLink {
 
  url: string;
  platform:string
}

export const Footer: React.FC = () => {
  const { getComponent } = useCMS()
  const componentData = getComponent('footer')

  
  const getDinamycIcon = (platform: string) => {

    switch (platform) {
      case 'LinkedIn':
        return <LinkedinIcon />;
      case 'Twitter':
        return <TwitterIcon />;
      case 'Facebook':
        return <FacebookIcon />;
      default:
        return null;
    }
  }

  if (!componentData?.attributes) return null

  const links = componentData.attributes.content.links || [];
  const copyrightText = componentData.attributes.text.copyright.replace("{date}", new Date().getFullYear().toString());

  return (
    <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>{copyrightText}</p>
          <div className="mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
            {links.map((link: SocialLink, index:number) => (
              <a
                key={link.platform}
                href={link.url}
                className="text-gray-400 hover:text-white mx-2"
                target="_blank"
                rel="noopener noreferrer"
              >
               <i className={`fab fa-${link.platform}`}>{getDinamycIcon(link.platform)}</i>  
              </a>
            ))}
            </div>
        </div>
      </footer>
  )
}
