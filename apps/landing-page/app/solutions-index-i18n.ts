/*
 * Copy for the `/solutions/` index (overview) page — the hub that links to
 * every Solution sub-page (Use cases + Roles). Only the page's own chrome
 * lives here (label / heading / lead); each card's text is pulled from that
 * sub-page's own `getSolutionPageCopy` breadcrumb + description, and the two
 * group headings reuse the header nav labels (`nav.useCases` / `nav.roles`),
 * so there is a single source of truth per string.
 *
 * Keyed by every `LandingLocaleCode`; the `Record` type makes a missing
 * locale a typecheck error, matching the 18-locale guarantee the rest of the
 * landing i18n relies on.
 */
import type { LandingLocaleCode } from './i18n';

export interface SolutionsIndexCopy {
  /** Small kicker label above the H1. */
  label: string;
  /** Page H1. */
  heading: string;
  /** One-sentence intro under the H1. */
  lead: string;
}

const COPY: Record<LandingLocaleCode, SolutionsIndexCopy> = {
  en: {
    label: 'SOLUTION',
    heading: 'Joushen Studio solutions',
    lead: "Find the right way to use Joushen Studio — by what you're making, and by the role you play.",
  },
  zh: {
    label: '解决方案',
    heading: 'Joushen Studio 解决方案',
    lead: '找到最适合你的 Joushen Studio 使用方式——既可按你要构建的内容（使用场景）查找，也可按你的角色查找。',
  },
  'zh-tw': {
    label: '解決方案',
    heading: 'Joushen Studio 解決方案',
    lead: '依你要打造的內容、依你扮演的角色，找到最適合運用 Joushen Studio 的方式。',
  },
  ja: {
    label: 'ソリューション',
    heading: 'Joushen Studio のソリューション',
    lead: '作りたいもの（ユースケース）と、あなたの役割の両方から、Joushen Studio を活用する最適な方法を見つけましょう。',
  },
  ko: {
    label: '솔루션',
    heading: 'Joushen Studio 솔루션',
    lead: '만들려는 것과 맡은 역할에 따라 정리된, Joushen Studio를 활용하는 가장 알맞은 방법을 찾아보세요.',
  },
  de: {
    label: 'Lösung',
    heading: 'Joushen Studio Lösungen',
    lead: 'Finden Sie den passenden Weg, Joushen Studio zu nutzen – sortiert danach, was Sie entwickeln, und nach Ihrer Rolle.',
  },
  fr: {
    label: 'SOLUTION',
    heading: 'Solutions Joushen Studio',
    lead: "Trouvez la meilleure façon d'utiliser Joushen Studio — selon ce que vous créez et selon votre rôle.",
  },
  ru: {
    label: 'Решение',
    heading: 'Решения Joushen Studio',
    lead: 'Найдите подходящий способ использовать Joushen Studio — по тому, что вы создаёте, и по вашей роли.',
  },
  es: {
    label: 'SOLUCIÓN',
    heading: 'Soluciones de Joushen Studio',
    lead: 'Encuentra la mejor manera de usar Joushen Studio: según lo que estás creando y según tu rol.',
  },
  'pt-br': {
    label: 'Solução',
    heading: 'Soluções do Joushen Studio',
    lead: 'Encontre a maneira certa de usar o Joushen Studio — pelo que você está criando e pela função que você desempenha.',
  },
  it: {
    label: 'Soluzione',
    heading: 'Le soluzioni di Joushen Studio',
    lead: 'Trova il modo giusto di usare Joushen Studio, organizzato in base a ciò che stai creando e al ruolo che ricopri.',
  },
  vi: {
    label: 'Giải pháp',
    heading: 'Giải pháp Joushen Studio',
    lead: 'Tìm cách phù hợp để sử dụng Joushen Studio — theo những gì bạn đang xây dựng, và theo vai trò của bạn.',
  },
  pl: {
    label: 'Rozwiązanie',
    heading: 'Rozwiązania Joushen Studio',
    lead: 'Znajdź właściwy sposób korzystania z Joushen Studio — według tego, co tworzysz, i według roli, jaką pełnisz.',
  },
  id: {
    label: 'Solusi',
    heading: 'Solusi Joushen Studio',
    lead: 'Temukan cara yang tepat untuk menggunaka Joushen Studio — berdasarkan apa yang Anda buat, dan berdasarkan peran yang Anda jalankan.',
  },
  nl: {
    label: 'OPLOSSING',
    heading: 'Joushen Studio-oplossingen',
    lead: 'Vind de juiste manier om Joushen Studio te gebruiken — op basis van wat je maakt en van de rol die je vervult.',
  },
  ar: {
    label: 'حل',
    heading: 'حلول Joushen Studio',
    lead: 'اعثر على الطريقة المناسبة لاستخدام Joushen Studio — حسب ما تبنيه، وحسب الدور الذي تؤديه.',
  },
  tr: {
    label: 'Çözüm',
    heading: 'Joushen Studio çözümleri',
    lead: "Joushen Studio'ı kullanmanın doğru yolunu bulun — ne ürettiğinize ve hangi rolü üstlendiğinize göre.",
  },
  uk: {
    label: 'Рішення',
    heading: 'Рішення Joushen Studio',
    lead: 'Знайдіть свій спосіб використання Joushen Studio — за тим, що ви створюєте, і за вашою роллю.',
  },
};

export function getSolutionsIndexCopy(locale: LandingLocaleCode): SolutionsIndexCopy {
  return COPY[locale] ?? COPY.en;
}
