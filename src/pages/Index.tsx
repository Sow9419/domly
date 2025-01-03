import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import CategoryBar from "@/components/layout/CategoryBar";
import PropertyGrid from "@/components/layout/PropertyGrid";
import SideNav from "@/components/layout/SideNav";
import BottomNav from "@/components/layout/BottomNav";
import { properties } from "@/data/properties";
import type { CategoryType } from "@/components/layout/CategoryBar";

const Index = () => {
  // États pour la gestion des filtres et de la recherche
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Fonction de filtrage des propriétés
  const filteredProperties = properties.filter((property) => {
    const matchesCategory = selectedCategory === "all" || property.category === selectedCategory;
    const matchesSearch = searchTerm === "" || 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Gestionnaires d'événements
  const handleCategoryChange = useCallback((category: CategoryType) => {
    setSelectedCategory(category);
  }, []);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Layout Mobile */}
      <div className="md:hidden">
        <Header onSearch={handleSearch} />
        <CategoryBar onCategoryChange={handleCategoryChange} onSearch={handleSearch} />
        <main className="pt-20 pb-20">
          <PropertyGrid properties={filteredProperties} />

          <div className="mx-4 mt-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Devenez hôte</h2>
            <p className="mb-6">Gagnez un revenu complémentaire en partageant votre logement</p>
            <Button variant="secondary" className="bg-white text-pink-500 hover:bg-gray-100">
              En savoir plus
            </Button>
          </div>
        </main>
        <BottomNav />
      </div>

      {/* Layout Desktop */}
      <div className="hidden md:flex h-screen">
        <div className="w-[72px] overflow-y-auto border-r border-gray-100 bg-white hide-scrollbar">
          <SideNav />
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onSearch={handleSearch} />
          <CategoryBar onCategoryChange={handleCategoryChange} onSearch={handleSearch} />
          <main className="flex-1 overflow-y-auto hide-scrollbar">
            <PropertyGrid properties={filteredProperties} />

            <div className="container mx-auto px-8 mb-8">
              <div className="mt-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Devenez hôte</h2>
                <p className="mb-6">Gagnez un revenu complémentaire en partageant votre logement</p>
                <Button variant="secondary" className="bg-white text-pink-500 hover:bg-gray-100">
                  En savoir plus
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;