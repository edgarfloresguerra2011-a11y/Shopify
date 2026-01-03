
import React from 'react';
import { ViewMode, Language } from '../types';

interface InfoPageProps {
  view: ViewMode;
  language: Language;
  onNavigate: (v: ViewMode) => void;
}

const CONTENT = {
  [ViewMode.STORY]: {
    title: { ES: 'Nuestra Historia', EN: 'Our Story', FR: 'Notre Histoire', DE: 'Unsere Geschichte', ZH: '我们的故事' },
    content: {
      ES: 'Fundada en 2020 en el corazón de Estocolmo, Modern Living nació con una misión simple: democratizar el diseño de alta gama y la tecnología de vanguardia. En 2026, nos hemos convertido en el referente global del hogar inteligente, fusionando la calidez del diseño escandinavo con la inteligencia artificial más avanzada. Creemos que tu espacio debe entenderte y adaptarse a ti, no al revés.',
      EN: 'Founded in 2020 in the heart of Stockholm, Modern Living was born with a simple mission: to democratize high-end design and cutting-edge technology. By 2026, we have become the global benchmark for the smart home, merging the warmth of Scandinavian design with the most advanced artificial intelligence. We believe your space should understand and adapt to you, not the other way around.',
      FR: 'Fondée en 2020 au cœur de Stockholm, Modern Living est née avec une mission simple : démocratiser le design haut de gamme et la technologie de pointe. En 2026, nous sommes devenus la référence mondiale de la maison intelligente, fusionnant la chaleur du design scandinave avec l\'intelligence artificielle la plus avancée.',
      DE: 'Modern Living wurde 2020 im Herzen von Stockholm mit einer einfachen Mission gegründet: High-End-Design und Spitzentechnologie zu demokratisieren. Bis 2026 sind wir zum globalen Maßstab für das Smart Home geworden und verbinden die Wärme skandinavischen Designs mit modernster künstlicher Intelligenz.',
      ZH: 'Modern Living 于 2020 年在斯德哥尔摩中心地带成立，其使命非常简单：让高端设计和尖端技术大众化。到 2026 年，我们已成为全球智能家居的标杆，将斯堪的纳维亚设计的温暖与最先进的人工智能相结合。'
    }
  },
  [ViewMode.SUSTAINABILITY]: {
    title: { ES: 'Sostenibilidad 2026', EN: 'Sustainability 2026', FR: 'Durabilité 2026', DE: 'Nachhaltigkeit 2026', ZH: '2026 可持续发展' },
    content: {
      ES: 'Para 2026, Modern Living ha alcanzado la neutralidad de carbono total. Todos nuestros productos utilizan materiales 100% reciclados o biodegradables. Nuestro sistema de logística inteligente reduce las emisiones en un 60% mediante entregas optimizadas por IA. No solo vendemos tecnología, protegemos el planeta que la alberga.',
      EN: 'By 2026, Modern Living has achieved full carbon neutrality. All our products use 100% recycled or biodegradable materials. Our smart logistics system reduces emissions by 60% through AI-optimized deliveries. We don\'t just sell technology; we protect the planet that houses it.',
      FR: 'D\'ici 2026, Modern Living aura atteint la neutralité carbone totale. Tous nos produits utilisent des matériaux 100 % recyclés ou biodégradables. Notre système logistique intelligent réduit les émissions de 60 % grâce à des livraisons optimisées par l\'IA.',
      DE: 'Bis 2026 hat Modern Living die vollständige CO2-Neutralität erreicht. Alle unsere Produkte bestehen zu 100 % aus recycelten oder biologisch abbaubaren Materialien. Unser intelligentes Logistiksystem reduziert Emissionen durch KI-optimierte Lieferungen um 60 %.',
      ZH: '到 2026 年，Modern Living 已实现全面碳中和。我们的所有产品均使用 100% 回收或可生物降解的材料。我们的智能物流系统通过 AI 优化的送货方式将排放量减少了 60%。我们不仅销售技术，还保护承载它的地球。'
    }
  },
  [ViewMode.PRIVACY]: {
    title: { ES: 'Privacidad Digital', EN: 'Digital Privacy', FR: 'Confidentialité', DE: 'Datenschutz', ZH: '数字隐私' },
    content: {
      ES: 'Tus datos son tuyos. En el ecosistema de Modern Living de 2026, toda la información de tu hogar inteligente se procesa localmente mediante encriptación cuántica. Nunca vendemos tus datos a terceros. La transparencia no es una opción, es nuestro estándar.',
      EN: 'Your data is yours. In the 2026 Modern Living ecosystem, all your smart home information is processed locally using quantum encryption. We never sell your data to third parties. Transparency is not an option; it is our standard.',
      FR: 'Vos données vous appartiennent. Dans l\'écosystème Modern Living de 2026, toutes les informations de votre maison intelligente sont traitées localement par cryptage quantique. Nous ne vendons jamais vos données à des tiers.',
      DE: 'Deine Daten gehören dir. Im Modern Living-Ökosystem von 2026 werden alle Informationen zu deinem Smart Home lokal mit Quantenverschlüsselung verarbeitet. Wir verkaufen deine Daten niemals an Dritte.',
      ZH: '您的数据归您所有。在 2026 年的 Modern Living 生态系统中，您所有的智能家居信息都通过量子加密在本地进行处理。我们绝不会将您的数据出售给第三方。透明度不是一种选择，而是我们的标准。'
    }
  },
  [ViewMode.TERMS]: {
    title: { ES: 'Términos y Condiciones', EN: 'Terms & Conditions', FR: 'Conditions Générales', DE: 'AGB', ZH: '条款与条件' },
    content: {
      ES: 'Al utilizar los servicios de Modern Living, aceptas nuestra Garantía de Calidad 2026. Todos los dispositivos incluyen actualizaciones de software de por vida y soporte técnico IA 24/7. Las devoluciones son automáticas y gratuitas durante los primeros 60 días si el producto no supera tus expectativas de diseño.',
      EN: 'By using Modern Living services, you agree to our 2026 Quality Guarantee. All devices include lifetime software updates and 24/7 AI technical support. Returns are automatic and free for the first 60 days if the product does not exceed your design expectations.',
      FR: 'En utilisant les services Modern Living, vous acceptez notre garantie de qualité 2026. Tous les appareils incluent des mises à jour logicielles à vie et un support technique IA 24/7. Les retours sont automatiques et gratuits pendant les 60 premiers jours.',
      DE: 'Durch die Nutzung der Modern Living-Dienste stimmst du unserer Qualitätsgarantie 2026 zu. Alle Geräte verfügen über lebenslange Software-Updates und technischen KI-Support rund um die Uhr. Rücksendungen erfolgen in den ersten 60 Tagen automatisch und kostenlos.',
      ZH: '通过使用 Modern Living 服务，您即表示同意我们的 2026 质量保证。所有设备均包含终身软件更新和 24/7 AI 技术支持。如果产品未超出您的设计预期，前 60 天内可自动免费退货。'
    }
  },
  [ViewMode.SUPPORT]: {
    title: { ES: 'Centro de Ayuda AI', EN: 'AI Help Center', FR: 'Centre d\'aide IA', DE: 'KI-Hilfezentrum', ZH: 'AI 帮助中心' },
    content: {
      ES: '¿Necesitas ayuda? Nuestro asistente Smart Concierge está disponible en la esquina inferior derecha para resolver cualquier duda técnica de inmediato. También puedes contactarnos por holograma o correo electrónico. Tiempo de respuesta promedio: 2.5 segundos.',
      EN: 'Need help? Our Smart Concierge assistant is available in the bottom right corner to resolve any technical questions immediately. You can also contact us via hologram or email. Average response time: 2.5 seconds.',
      FR: 'Besoin d\'aide ? Notre assistant Smart Concierge est disponible dans le coin inférieur droit pour répondre immédiatement à toutes vos questions techniques. Vous pouvez également nous contacter par hologramme ou par e-mail.',
      DE: 'Benötigst du Hilfe? Unser Smart Concierge-Assistent steht dir in der unteren rechten Ecke zur Verfügung, um technische Fragen sofort zu klären. Du kannst uns auch per Hologramm oder E-Mail kontaktieren.',
      ZH: '需要帮助吗？我们的智能礼宾助手位于右下角，可立即解决任何技术问题。您也可以通过全息图或电子邮件与我们联系。平均响应时间：2.5 秒。'
    }
  }
};

const InfoPage: React.FC<InfoPageProps> = ({ view, language, onNavigate }) => {
  const data = CONTENT[view] || CONTENT[ViewMode.STORY];

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 md:py-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <nav className="mb-12">
        <button 
          onClick={() => onNavigate(ViewMode.HOME)}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-all group"
        >
          <span className="material-symbols-outlined !text-sm group-hover:-translate-x-1 transition-transform">west</span>
          {language === 'ES' ? 'Volver' : language === 'EN' ? 'Back' : language === 'FR' ? 'Retour' : language === 'DE' ? 'Zurück' : '返回'}
        </button>
      </nav>
      
      <h1 className="font-display font-black text-5xl md:text-7xl mb-16 tracking-tighter leading-none">
        {data.title[language]}
      </h1>
      
      <div className="prose prose-xl prose-gray">
        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
          {data.content[language]}
        </p>
      </div>

      <div className="mt-24 pt-12 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-gray-50 rounded-[2rem]">
          <h4 className="font-bold text-sm mb-2">Modern Living Global</h4>
          <p className="text-xs text-gray-400">Stockholm • Tokyo • New York • Berlin</p>
        </div>
        <div className="p-8 bg-gray-50 rounded-[2rem]">
          <h4 className="font-bold text-sm mb-2">Contact Info</h4>
          <p className="text-xs text-gray-400">hello@modernliving.2026 • +46 8 123 456</p>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
