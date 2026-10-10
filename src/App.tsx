import React, { useState } from 'react';
import { CATALOG_DATA, ProductItem } from './catalogData';
import { NavigationHeader, ExecutiveTab, ScreenView } from './components/NavigationHeader';
import { ShowroomFloorTab } from './components/ShowroomFloorTab';
import { ProductionSimulatorTab } from './components/ProductionSimulatorTab';
import { ExecutiveTermSheetTab } from './components/ExecutiveTermSheetTab';
import { InspectionDrawer } from './components/InspectionDrawer';
import { FactoryLineScreen } from './components/FactoryLineScreen';
import { ShowroomEngineScreen } from './components/ShowroomEngineScreen';
import { DealDeskScreen } from './components/DealDeskScreen';
import { MaintenanceBayScreen } from './components/MaintenanceBayScreen';
import { Screen6Pricing } from './components/Screen6Pricing';
import { Screen7ValuationHub } from './components/Screen7ValuationHub';
import { MissionModal } from './components/MissionModal';
import { TestDriveModal } from './components/TestDriveModal';
import { AuditModal } from './components/AuditModal';
import { OperatorAuthModal } from './components/OperatorAuthModal';
import { ArrowLeft } from 'lucide-react';

export const App: React.FC = () => {
  // Executive Cockpit Tab State (Default: Showroom Floor)
  const [activeTab, setActiveTab] = useState<ExecutiveTab>('showroom');

  // Screen View State for Full Console Compatibility (Default: 'garage' maps to cockpit)
  const [currentView, setCurrentView] = useState<ScreenView | 'cockpit'>('cockpit');

  // Operator Authentication State (Private Deal Room Perimeter Isolation)
  const [isOperatorAuthenticated, setIsOperatorAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('gfcc_operator_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [isOperatorModalOpen, setIsOperatorModalOpen] = useState(false);

  const handleAuthenticateOperator = () => {
    setIsOperatorAuthenticated(true);
    try {
      sessionStorage.setItem('gfcc_operator_auth', 'true');
    } catch {}
  };

  const handleLockOperator = () => {
    setIsOperatorAuthenticated(false);
    try {
      sessionStorage.removeItem('gfcc_operator_auth');
    } catch {}
  };

  // Modals & Slide-Over Drawer States
  const [inspectedProduct, setInspectedProduct] = useState<ProductItem | null>(null);
  const [testDriveProduct, setTestDriveProduct] = useState<ProductItem | null>(null);
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false);
  const [missionCompleted, setMissionCompleted] = useState(true);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Core metrics derived from v2 specifications (160 Active Units: 137 Base + 23 T3)
  const totalAssets = 160;
  const retainedFloor = 128; // 80% immutable retention floor (128 of 160 vaulted)
  const availableApaSlots = 32; // 20% max APA capacity (32 transferable slots)

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

  const handleTabChange = (tab: ExecutiveTab) => {
    setActiveTab(tab);
    setCurrentView('cockpit');
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#0A0A0B] text-slate-100 font-mono selection:bg-emerald-500 selection:text-black">
      {/* 1. PERSISTENT TOP HEADER & EXECUTIVE NAVIGATION BAR */}
      <NavigationHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        currentView={currentView === 'cockpit' ? 'garage' : currentView}
        onViewChange={(view) => setCurrentView(view)}
        isRefreshing={isRefreshing}
        onHardRefresh={handleHardRefresh}
        onOpenAudit={() => setShowAuditModal(true)}
        totalAssets={totalAssets}
        isOperatorAuthenticated={isOperatorAuthenticated}
        onOpenOperatorAuth={() => setIsOperatorModalOpen(true)}
        onLockOperator={handleLockOperator}
      />

      {/* 2. BOUNDED VIEWPORT MAIN CONTENT CONTAINER (NO ENDLESS PAGE SCROLL) */}
      <main className="flex-1 overflow-y-auto min-h-0 pr-2 relative w-full bg-[#0A0A0B]/80 px-3 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* PRIMARY EXECUTIVE COCKPIT VIEWS */}
          {currentView === 'cockpit' && (
            <>
              {/* TAB 1: SHOWROOM FLOOR (Paginated 3x3 Card Matrix & Slide-over Drawer) */}
              {activeTab === 'showroom' && (
                <ShowroomFloorTab
                  products={CATALOG_DATA.products}
                  totalAssets={totalAssets}
                  onInspect={(p) => setInspectedProduct(p)}
                  onTestDrive={(p) => setTestDriveProduct(p)}
                />
              )}

              {/* TAB 2: PRODUCTION SIMULATOR (160 -> 500 Capacity Slider & 4 Projection Cards) */}
              {activeTab === 'simulator' && (
                <ProductionSimulatorTab
                  initialFleetCount={totalAssets}
                />
              )}

              {/* TAB 3: EXECUTIVE TERM SHEET (Institutional Buyout Protocol, 80% Retention Floor) */}
              {activeTab === 'terms' && (
                <ExecutiveTermSheetTab
                  products={CATALOG_DATA.products}
                  totalAssets={totalAssets}
                  retainedFloor={retainedFloor}
                  maxTransferable={availableApaSlots}
                />
              )}
            </>
          )}

          {/* SECONDARY SCREEN VIEWS (PRESERVES DIRECT OPERATOR ACCESS TO SCREENS 2-7) */}
          {currentView !== 'cockpit' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <button
                  onClick={() => setCurrentView('cockpit')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 font-bold transition-all cursor-pointer text-xs"
                >
                  <ArrowLeft size={14} />
                  <span>RETURN TO EXECUTIVE COCKPIT</span>
                </button>
                <span className="text-xs text-slate-400 font-bold uppercase">
                  ACTIVE SUB-CONSOLE: {currentView.toUpperCase()}
                </span>
              </div>

              {currentView === 'factory' && (
                <FactoryLineScreen
                  products={CATALOG_DATA.products}
                  totalAssets={totalAssets}
                />
              )}

              {currentView === 'showroom' && (
                <ShowroomEngineScreen
                  products={CATALOG_DATA.products}
                  onOpenTestDrive={(product) => setTestDriveProduct(product)}
                />
              )}

              {currentView === 'dealdesk' && (
                <DealDeskScreen
                  products={CATALOG_DATA.products}
                  totalAssets={totalAssets}
                  retainedFloor={retainedFloor}
                  maxTransferable={availableApaSlots}
                  isOperatorAuthenticated={isOperatorAuthenticated}
                  onAuthenticate={handleAuthenticateOperator}
                  onLockOperator={handleLockOperator}
                />
              )}

              {currentView === 'maintenance' && (
                <MaintenanceBayScreen
                  products={CATALOG_DATA.products}
                  totalAssets={totalAssets}
                />
              )}

              {currentView === 'pricing' && <Screen6Pricing />}

              {currentView === 'valuationhub' && (
                <Screen7ValuationHub
                  totalAssets={totalAssets}
                  retainedFloor={retainedFloor}
                  maxTransferable={availableApaSlots}
                />
              )}
            </div>
          )}
        </div>
      </main>

      {/* 3. PERSISTENT COCKPIT FOOTER & BUILD STAMP */}
      <footer id="gfcc-footer" className="shrink-0 border-t border-white/10 bg-[#08080A] py-2 px-4 text-xs text-slate-400 z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <span>GFCC Build: v2.0.0-PROD</span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 font-bold">160 Active Digital Vehicles</span>
          </div>
          <span className="text-slate-500 hidden sm:inline">
            Lexus Luxury Manufacturing Standards // Fixed Cockpit v2.0
          </span>
        </div>
      </footer>

      {/* 4. SLIDE-OVER INSPECTION DRAWER */}
      <InspectionDrawer
        product={inspectedProduct}
        isOpen={Boolean(inspectedProduct)}
        onClose={() => setInspectedProduct(null)}
        onOpenTestDrive={(product) => setTestDriveProduct(product)}
      />

      {/* 5. MODALS */}
      <TestDriveModal
        product={testDriveProduct}
        isOpen={Boolean(testDriveProduct)}
        onClose={() => setTestDriveProduct(null)}
      />

      <AuditModal
        isOpen={showAuditModal}
        onClose={() => setShowAuditModal(false)}
        totalAssets={totalAssets}
      />

      <OperatorAuthModal
        isOpen={isOperatorModalOpen}
        onClose={() => setIsOperatorModalOpen(false)}
        onAuthenticate={handleAuthenticateOperator}
      />

      <MissionModal
        isOpen={isMissionModalOpen}
        onClose={() => setIsMissionModalOpen(false)}
        onComplete={() => setMissionCompleted(true)}
        isCompleted={missionCompleted}
      />
    </div>
  );
};

export default App;
