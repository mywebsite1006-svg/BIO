import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, X } from 'lucide-react';
import { PortfolioProject, siteConfig } from '../config/siteConfig';
import { ResilientImage } from './ResilientImage';

interface PortfolioSectionProps {
  onSelectProjectInquiry: (serviceType: string, projectContext: string) => void;
}

const CATEGORIES = [
  'All',
  'Hospitality',
  'Retail',
  'Architecture & Build',
  'Healthcare',
  'Local Services',
] as const;

type CategoryFilter = (typeof CATEGORIES)[number];

export function PortfolioSection({ onSelectProjectInquiry }: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') {
      return siteConfig.portfolio;
    }
    return siteConfig.portfolio.filter((project) => project.category === selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (!activeProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject]);

  const handleBuildSimilar = (project: PortfolioProject) => {
    setActiveProject(null);
    onSelectProjectInquiry(
      project.suggestedService,
      `Interested in a website similar in style and structure to the "${project.title}" (${project.industry}) concept.`
    );
  };

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-[#FFFFFF] border-y border-[#E4DCD1] py-20 lg:py-28"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-[13px] font-medium text-[#594333] mb-3.5">
              Our Work · Concept Projects
            </p>
            <h2
              id="work-heading"
              className="font-serif text-[2rem] sm:text-[2.6rem] leading-[1.12] text-[#191919]"
            >
              Website concepts crafted for real local industries.
            </h2>
          </div>
          <p className="text-[14.5px] leading-[1.68] text-[#5C5650] max-w-md">
            These demonstration concepts showcase our design direction across industries we serve. Each entry is labelled as a Concept Project and structured for easy replacement as client launches go live.
          </p>
        </div>

        {/* Interactive Category Filter Controls */}
        <div
          role="tablist"
          aria-label="Filter concept projects by industry"
          className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-10 border-b border-[#E4DCD1]"
        >
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-2 text-[13.5px] font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#30251D] text-[#FAF9F6]'
                    : 'text-[#5C5650] hover:text-[#191919] hover:bg-[#E9E1D6]/55'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Editorial Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-11">
          {filteredProjects.map((project) => (
            <article key={project.id} className="group flex flex-col">
              <button
                type="button"
                onClick={() => setActiveProject(project)}
                className="text-left block w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-[#30251D] rounded-xl"
                aria-label={`Preview ${project.title} — ${project.industry} ${project.isConcept ? 'Concept Project' : 'Project'}`}
              >
                <div className="rounded-xl overflow-hidden border border-[#E4DCD1] bg-[#E9E1D6]/40 mb-5">
                  <ResilientImage
                    src={project.imageUrl}
                    alt={project.imageAlt}
                    fallbackTitle={project.title}
                    fallbackSubtitle={project.industry}
                    containerClassName="aspect-[4/3] w-full"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Unboxed quiet metadata line */}
                <div className="flex items-center gap-2 text-[12.5px] text-[#77716B] mb-2">
                  <span>{project.industry}</span>
                  {project.isConcept && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#594333] font-medium">Concept Project</span>
                    </>
                  )}
                </div>

                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <h3 className="font-serif text-[1.45rem] leading-[1.2] text-[#191919] group-hover:text-[#594333] transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight
                    className="w-4 h-4 text-[#77716B] group-hover:text-[#30251D] mt-1.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </div>

                <p className="text-[14.5px] leading-[1.65] text-[#5C5650]">
                  {project.shortDescription}
                </p>
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* Fullscreen Editorial Preview Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#191919]/65 backdrop-blur-[2px]"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="bg-[#FAF9F6] border border-[#E4DCD1] rounded-xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar inside Modal */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 sm:px-8 py-4 bg-[#FAF9F6]/95 backdrop-blur-sm border-b border-[#E4DCD1]">
              <div className="flex items-center gap-2 text-[13px] text-[#5C5650] truncate">
                <span className="font-medium text-[#594333]">
                  {activeProject.isConcept ? 'Concept Project' : 'Client Project'}
                </span>
                <span aria-hidden="true">·</span>
                <span className="truncate">{activeProject.industry}</span>
                <span aria-hidden="true" className="hidden sm:inline">·</span>
                <span className="hidden sm:inline">{activeProject.deviceScope}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close project preview"
                className="w-10 h-10 rounded-md inline-flex items-center justify-center text-[#5C5650] hover:text-[#191919] hover:bg-[#E9E1D6]/70 transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="rounded-xl overflow-hidden border border-[#E4DCD1] mb-7">
                <ResilientImage
                  src={activeProject.imageUrl}
                  alt={activeProject.imageAlt}
                  fallbackTitle={activeProject.title}
                  fallbackSubtitle={activeProject.industry}
                  containerClassName="aspect-[4/3] w-full"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7">
                  <h3
                    id="project-lightbox-title"
                    className="font-serif text-[2rem] leading-[1.15] text-[#191919] mb-3.5"
                  >
                    {activeProject.title}
                  </h3>
                  <p className="text-[15.5px] leading-[1.7] text-[#5C5650] mb-4">
                    {activeProject.detailedSummary}
                  </p>
                  {activeProject.isConcept && (
                    <p className="text-[13px] text-[#77716B]">
                      Note: This is an in-house studio concept demonstration designed to illustrate layout quality and structure for {activeProject.industry.toLowerCase()} businesses.
                    </p>
                  )}
                </div>

                <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#E4DCD1] rounded-lg p-6">
                  <p className="text-[13px] font-medium text-[#594333] mb-3.5">
                    Key features in this concept
                  </p>
                  <ul className="space-y-2.5 mb-6">
                    {activeProject.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2.5 text-[14px] text-[#191919]"
                      >
                        <Check
                          className="w-4 h-4 text-[#594333] mt-0.5 shrink-0"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => handleBuildSimilar(activeProject)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-[14px] font-medium bg-[#30251D] text-[#FAF9F6] rounded-md hover:bg-[#594333] transition-colors cursor-pointer"
                  >
                    <span>Build Something Similar</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
