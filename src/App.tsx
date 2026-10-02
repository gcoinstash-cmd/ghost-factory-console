import React, { useState } from 'react';
import { CATALOG_DATA, ProductItem } from './catalogData';
import { NavigationHeader, ScreenView } from './components/NavigationHeader';
import { GarageScreen } from './components/GarageScreen';
import { FactoryLineScreen } from './components/FactoryLineScreen';
import { ShowroomEngineScreen } from './components/ShowroomEngineScreen';
import { DealDeskScreen } from './components/DealDeskScreen';
import { MaintenanceBayScreen } from './components/MaintenanceBayScreen';
import { MissionModal } from './components/MissionModal';
import { TestDriveModal } from './components/TestDriveModal';
import { AuditModal } from './components/AuditModal';
import { OperatorAuthModal } from './components/OperatorAuthModal';
import { LayoutGrid, Compass, DollarSign, Wrench, Lock } from 'lucide-react';

export const App: React.FC = () => {
  // Navigation View State (Screens 1 to 5)
  const [currentView, setCurrentView] = useState<ScreenView>('garage');

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

  // Modal states
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false);
  const [missionCompleted, setMissionCompleted] = useState(true);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [testDriveProduct, setTestDriveProduct] = useState<ProductItem | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Core metrics derived from v2 specifications (Inline Public Telemetry Constants)
  const totalAssets = CATALOG_DATA.total_flagships || 110;
  const retainedFloor = 88; // 80% immutable retention floor
  const availableApaSlots = 22; // 20% max APA capacity
  const planningValue = 160000; // Curated Public Telemetry Reference

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
    <div className="min-h-screen bg-[#0A0A0B] text-slate-100 hud-grid pb-28 md:pb-24 selection:bg-emerald-500 selection:text-black">
      {/* Top Header & Screen Navigation */}
      <NavigationHeader
        currentView={currentView}
        onViewChange={setCurrentView}
        isRefreshing={isRefreshing}
        onHardRefresh={handleHardRefresh}
        onOpenAudit={() => setShowAuditModal(true)}
        totalAssets={totalAssets}
        isOperatorAuthenticated={isOperatorAuthenticated}
        onOpenOperatorAuth={() => setIsOperatorModalOpen(true)}
        onLockOperator={handleLockOperator}
      />

      {/* Main Screen Views */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
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
            isOperatorAuthenticated={isOperatorAuthenticated}
            onOpenOperatorAuth={() => setIsOperatorModalOpen(true)}
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

        {/* Screen 4: Deal Desk & 80% Retention Floor Shield (Private Deal Room) */}
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

        {/* Screen 5: Maintenance Bay & Fleet Diagnostics */}
        {currentView === 'maintenance' && (
          <MaintenanceBayScreen
            products={CATALOG_DATA.products}
            totalAssets={totalAssets}
          />
        )}
      </main>

      {/* VISIBLE BUILD STAMP FOOTER */}
      <footer id="gfcc-footer" className="border-t border-white/10 bg-[#0A0A0B] py-6 px-4 text-center font-mono text-xs text-slate-400 mb-16 md:mb-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>GFCC Build: v1.3.1</span>
          <span className="text-emerald-400 font-bold">110 / 110 Reference Digital Assets</span>
        </div>
      </footer>

      {/* STICKY MOBILE BOTTOM HUD BAR (Fixed on viewport < md for Mobile Ergonomics) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0B]/95 backdrop-blur-xl border-t border-emerald-500/30 px-2 py-2 flex items-center justify-around shadow-2xl font-mono text-xs">
        <button
          onClick={() => setCurrentView('garage')}
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl min-h-[44px] justify-center transition-all cursor-pointer ${
            currentView === 'garage'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <LayoutGrid size={17} />
          <span className="text-[10px] uppercase font-bold tracking-wide">Garage</span>
        </button>

        <button
          onClick={() => setCurrentView('showroom')}
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl min-h-[44px] justify-center transition-all cursor-pointer ${
            currentView === 'showroom'
              ? 'bg-white/20 text-white border border-white/40 font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Compass size={17} />
          <span className="text-[10px] uppercase font-bold tracking-wide">Catalog</span>
        </button>

        <button
          onClick={() => {
            if (!isOperatorAuthenticated) {
              setIsOperatorModalOpen(true);
            }
            setCurrentView('dealdesk');
          }}
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl min-h-[44px] justify-center transition-all cursor-pointer ${
            currentView === 'dealdesk'
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50 font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <DollarSign size={17} />
          <span className="text-[10px] uppercase font-bold tracking-wide flex items-center gap-0.5">
            Deal Room
            {!isOperatorAuthenticated && <Lock size={9} className="text-amber-400 inline" />}
          </span>
        </button>

        <button
          onClick={() => setCurrentView('maintenance')}
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl min-h-[44px] justify-center transition-all cursor-pointer ${
            currentView === 'maintenance'
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50 font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Wrench size={17} />
          <span className="text-[10px] uppercase font-bold tracking-wide">Diagnostics</span>
        </button>
      </div>

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

      <OperatorAuthModal
        isOpen={isOperatorModalOpen}
        onClose={() => setIsOperatorModalOpen(false)}
        onAuthenticate={handleAuthenticateOperator}
      />
    </div>
  );
};

export default App;

