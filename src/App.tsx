import React, { useState } from 'react';
import { CATALOG_DATA, ProductItem } from './catalogData';
import PORTFOLIO_METRICS from './portfolio-metrics.json';
import { NavigationHeader, ScreenView } from './components/NavigationHeader';
import { GarageScreen } from './components/GarageScreen';
import { FactoryLineScreen } from './components/FactoryLineScreen';
import { ShowroomEngineScreen } from './components/ShowroomEngineScreen';
import { DealDeskScreen } from './components/DealDeskScreen';
import { MaintenanceBayScreen } from './components/MaintenanceBayScreen';
import { MissionModal } from './components/MissionModal';
import { TestDriveModal } from './components/TestDriveModal';
import { AuditModal } from './components/AuditModal';

export const App: React.FC = () => {
  // Navigation View State (Screens 1 to 5)
  const [currentView, setCurrentView] = useState<ScreenView>('garage');

  // Modal states
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false);
  const [missionCompleted, setMissionCompleted] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [testDriveProduct, setTestDriveProduct] = useState<ProductItem | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Core metrics derived from v2 specifications & portfolio metrics
  const totalAssets = CATALOG_DATA.total_flagships || 85;
  const retainedFloor = PORTFOLIO_METRICS.retainedFloorCount || 68; // 80% immutable retention floor
  const availableApaSlots = PORTFOLIO_METRICS.maxApaCapacity || 17; // 20% max APA capacity
  const planningValue = PORTFOLIO_METRICS.valuationAppraisal?.planningFmv || 33000;

  // Hard Refresh Handler to clear cache and refresh view
  const handleHardRefresh = () => {
    setIsRefreshing(true);
    try {
      if ('caches' in window) {
        caches.keys().then((names) => {
          names.forEach((name) => caches.delete(name));
        });
      }
    } catch (e) {
      console.warn('Cache clearing error:', e);
    }
    setTimeout(() => {
      setIsRefreshing(false);
      window.location.reload();
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-100 hud-grid pb-24 selection:bg-emerald-500 selection:text-black">
      {/* Top Header & Screen Navigation */}
      <NavigationHeader
        currentView={currentView}
        onViewChange={setCurrentView}
        isRefreshing={isRefreshing}
        onHardRefresh={handleHardRefresh}
        onOpenAudit={() => setShowAuditModal(true)}
        totalAssets={totalAssets}
      />

      {/* Main Screen Views */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Screen 1: Garage HUD */}
        {currentView === 'garage' && (
          <GarageScreen
            products={CATALOG_DATA.products}
            totalAssets={totalAssets}
            retainedFloor={retainedFloor}
            availableApaSlots={availableApaSlots}
            planningValue={planningValue}
            onEngageMission={() => setIsMissionModalOpen(true)}
            missionCompleted={missionCompleted}
            onOpenTestDrive={(product) => setTestDriveProduct(product)}
          />
        )}

        {/* Screen 2: Factory Line & Intake Gate */}
        {currentView === 'factory' && (
          <FactoryLineScreen
            products={CATALOG_DATA.products}
            totalAssets={totalAssets}
          />
        )}

        {/* Screen 3: Showroom Engine (Aura & Grid Bridge - Two-Faced Clean Separation) */}
        {currentView === 'showroom' && (
          <ShowroomEngineScreen
            products={CATALOG_DATA.products}
            onOpenTestDrive={(product) => setTestDriveProduct(product)}
          />
        )}

        {/* Screen 4: Deal Desk & 80% Retention Floor Shield */}
        {currentView === 'dealdesk' && (
          <DealDeskScreen
            products={CATALOG_DATA.products}
            totalAssets={totalAssets}
            retainedFloor={retainedFloor}
            maxTransferable={availableApaSlots}
          />
        )}

        {/* Screen 5: Maintenance Bay & Fleet Diagnostics */}
        {currentView === 'maintenance' && (
          <MaintenanceBayScreen
            products={CATALOG_DATA.products}
            totalAssets={totalAssets}
          />
        )}
      </main>

      {/* Modals */}
      <MissionModal
        isOpen={isMissionModalOpen}
        onClose={() => setIsMissionModalOpen(false)}
        onComplete={() => setMissionCompleted(true)}
        isCompleted={missionCompleted}
      />

      <TestDriveModal
        product={testDriveProduct}
        isOpen={!!testDriveProduct}
        onClose={() => setTestDriveProduct(null)}
      />

      <AuditModal
        isOpen={showAuditModal}
        onClose={() => setShowAuditModal(false)}
        totalAssets={totalAssets}
      />
    </div>
  );
};

export default App;

