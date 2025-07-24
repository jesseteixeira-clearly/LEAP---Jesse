export const cmsData = [
  {
    id: "hero-banner",
    type: "hero",
    attributes: {
      background: {
        type: "image",
        overlay: {
          color: "rgba(0,0,0,0.5)",
          enabled: true,
        },
      },
      content: {
        title: {
          text: "Welcome to Our Platform",
          style: {
            fontSize: "48px",
            color: "#ffffff",
            fontWeight: "bold",
          },
        },
        subtitle: {
          text: "Discover Amazing Features",
          style: {
            fontSize: "24px",
            color: "#f0f0f0",
          },
        },
        cta: {
          text: "Get Started",
           
        },
      },
    },
  },
  {
    id: "feature-grid",
    type: "grid",
    attributes: {
      layout: {
        columns: 3,
        gap: "20px",
        padding: "40px",
      },
      items: [
        {
          id: "feature-1",
          style:{
            wrapperClass: "bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          },
          content: {
            title: "Fast Performance",
            description: "Lightning quick loading times",
            alignment: "center",
            icon: "icon-fast-performance",
          },
        },
        {
          id: "feature-2",
          style: {
            wrapperClass: "bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          },
          content: {
            title: "Secure Platform",
            description: "Enterprise-grade security",
            alignment: "center",
            icon: "icon-secure-platform",
          },
        },
        {
          id: "feature-3",
          style: {
            wrapperClass: "bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          },
          content: {
            title: "Scalable Solution",
            description: "Grows with your business needs",
            alignment: "center",
            icon: "icon-scalable-solution",
          },
        },
      ],
    },
  },
  {
    id: "contact-form",
    type: "form",
    attributes: {
      fields: [
        {
          type: "text",
          name: "fullName",
          label: "Full Name",
          validation: {
            required: true,
            minLength: 2,
            maxLength: 50,
          },
          styling: {
            className: "form-input",
            placeholder: "Enter your full name",
          },
        },
        {
          type: "email",
          name: "email",
          label: "Email Address",
          validation: {
            required: true,
            pattern: "^[^@]+@[^@]+\\.[^@]+$",
          },
          styling: {
            className: "form-input",
            placeholder: "your@email.com",
          },
        },
        {
          type: "textArea",
          name: "message",
          label: "Message",
          validation: {
            required: true,
            minLength: 2,
            maxLength: 50,
          },
          styling: {
            rows: '4',
            className: "form-input",
            placeholder: "How can we help you?",
          },
        },
      ],
      submission: {
        endpoint: "/api/contactable",
        method: "POST",
        successMessage: "Thank you for contacting us!",
        errorMessage: "Something went wrong. Please try again.",
        cta: {
         label: {
          action: "Send Message",
          loading: "Sending...",
         }
        }
      },
    },
  },
  {
    id: "footer",
    attributes: {
      text: {
        copyright: "© {date} Mayhem. All rights reserved.",
      }, 
      content: {
        links: [
        {
          platform: "Facebook",
          url: "#",
        },
        {
          platform: "Twitter",
          url: "#",
        },
        {
          platform: "LinkedIn",
          url: "#",
        },
      ],
      }
    }

  }
];
