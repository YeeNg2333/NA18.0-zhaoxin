export type Department = {
  slug: string;
  title: string;
  intro: string; // 列表页 2 句话
  details: string[]; // 详情页 4-5 句
  description?: string // 图二
  gradient?: string; // 占位封面渐变
  imageSrc?: string; // 可选封面图
  images?: string[]; // 详情页图片，多张按一列向下排列
};

export const departments: Department[] = [
  {
    slug: "tech",
    title: "技术部",
    intro:
      "我们探索前沿技术，推动内部工具与平台持续进化。团队关注工程质量与效率，致力于用技术创造价值。",
    details: [
      "技术部负责核心系统与基础设施的研发与维护，关注可扩展性、稳定性与安全性。",
      "我们倡导工程最佳实践与自动化，提升交付效率与质量。",
      "同时我们重视知识分享与培训，帮助团队成员跨越技术成长曲线。",
      "在复杂问题面前，保持好奇与务实，是我们的共识。",
    ],
    gradient: "from-primary/25 via-primary/10 to-background",
    imageSrc: "/images/uploads/tech_party.jpeg"
  },
  {
    slug: "secretary",
    title: "秘书部",
    intro:
      "秘书部是中心的枢纽部门，连接着宣传、外联、资源等各部门，是一个融合管理运营与温馨社群的独特团体。",
    details: [
      "我们不仅是保障网络稳定的技术团队，更是以“交友”为核心的温馨集体。",
      "部门氛围轻松愉快，活动丰富：集体观影、生日庆祝、夜爬白云山、晚会筹办等，兼顾休闲与挑战。",
        "在这里，你将锻炼管理与沟通能力，收获深厚友谊和难忘的大学记忆。",
        "无论你是严谨的组织者还是渴望成长的探索者，秘书部都欢迎你的加入！",
        "让我们一起工作、欢笑，书写更多精彩故事。"
    ],
    description: "加入我们！无论你是细心严谨的组织者，还是渴望成长与交友的探索者，秘书部都欢迎你的到来。在这里，我们既能认真工作，也能尽情欢笑，共同书写更多精彩故事。",
    gradient: "from-secondary/25 via-secondary/10 to-background",
    imageSrc: "/images/uploads/sec.jpg",
    images: ["/images/uploads/sec.jpg"]
  },
  {
    slug: "publicity",
    title: "宣传部",
    intro:
      "宣传部是NA的“形象窗口”。主要重要信息发布，通过图文、视频等形式，讲好NA故事。",
    details: [
      "宣传部是NA的“形象窗口”。主要重要信息发布，通过图文、视频等形式，讲好NA故事；",
      "同时策划宣传活动、维护宣传平台，搭建内外沟通桥梁，让NA动态及时传递，助力塑造积极正面的整体形象。",
    ],
    gradient: "from-primary/20 via-secondary/10 to-background",
    imageSrc: "/images/uploads/pro.jpg",
    images: ["/images/uploads/pro.jpg"]
  },
  {
    slug: "outreach",
    title: "外联部",
    intro:
      "我们建立与维护外部合作关系，拓展资源与机会。以专业与诚信促成双赢合作。",
    details: [
      "网络管理协会外联部，我们是穿梭于商界与校园之间的外交官，",
      "买物资、拉赞助、谈合作等工作我们都不在话下，保障活动物资充足进行顺利是我们的职责。",
      "想提前玩转社会，解锁沟通与谈判的能力？外联等你来挑战！",
    ],
    gradient: "from-secondary/20 via-primary/10 to-background",
    imageSrc: "/images/uploads/con1.jpg",
    images: ["/images/uploads/con2.jpg"]
  },
  {
    slug: "resources",
    title: "资源部",
    intro:
      "数字世界的资源猎手，信息宝库的雕琢师！",
    details: [
      "在这信息如潮、充满惊喜的网络时代，你是否对社团网络资源的深度与广度，满是探索的热情？",
      "【网络工作站资源部】 是社团网络资源的 “能量补给站”，从实用工具到独家资料，",
      "你将掌握精准挖掘、有序整合资源的技能，",
      "让零散信息聚成助力成长的知识矩阵，为社团成员打造超酷的资源生态！",
    ],
    gradient: "from-primary/15 via-secondary/10 to-background",
    imageSrc: "/images/uploads/res.jpg",
    images: ["/images/uploads/res.jpg"]
  },
];
