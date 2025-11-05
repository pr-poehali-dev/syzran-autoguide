import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Car = {
  id: string;
  brand: string;
  model: string;
  year: string;
  plate: string;
  mileage: number;
  fuelConsumption: number;
};

type Refuel = {
  id: string;
  carId: string;
  date: string;
  liters: number;
  pricePerLiter: number;
  station: string;
  mileage: number;
};

type MapMarker = {
  id: string;
  type: 'camera' | 'bump' | 'pothole';
  name: string;
  address: string;
  lat: number;
  lng: number;
};

type Service = {
  id: string;
  name: string;
  type: 'gas' | 'wash' | 'service';
  address: string;
  rating: number;
  phone: string;
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('garage');
  const [cars] = useState<Car[]>([
    {
      id: '1',
      brand: 'Lada',
      model: 'Granta',
      year: '2020',
      plate: 'А777АА 163',
      mileage: 45320,
      fuelConsumption: 7.2,
    },
  ]);

  const [refuels] = useState<Refuel[]>([
    {
      id: '1',
      carId: '1',
      date: '2025-11-03',
      liters: 40,
      pricePerLiter: 51.5,
      station: 'Роснефть на ул. Гидротурбинная',
      mileage: 45320,
    },
    {
      id: '2',
      carId: '1',
      date: '2025-10-28',
      liters: 38,
      pricePerLiter: 51.2,
      station: 'Лукойл на Московском шоссе',
      mileage: 45050,
    },
  ]);

  const [markers] = useState<MapMarker[]>([
    { id: '1', type: 'camera', name: 'Камера скорости', address: 'ул. Гидротурбинная', lat: 53.15, lng: 48.47 },
    { id: '2', type: 'bump', name: 'Лежачий полицейский', address: 'ул. Советская', lat: 53.16, lng: 48.48 },
    { id: '3', type: 'pothole', name: 'Яма на дороге', address: 'ул. Ульяновская', lat: 53.14, lng: 48.46 },
  ]);

  const [services] = useState<Service[]>([
    { id: '1', name: 'Роснефть', type: 'gas', address: 'ул. Гидротурбинная, 12', rating: 4.5, phone: '+7 (8464) 98-12-34' },
    { id: '2', name: 'Автомойка "Чистота"', type: 'wash', address: 'ул. Советская, 45', rating: 4.8, phone: '+7 (8464) 98-56-78' },
    { id: '3', name: 'СТО "Мастер"', type: 'service', address: 'Московское шоссе, 23', rating: 4.6, phone: '+7 (8464) 98-90-12' },
  ]);

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'camera': return 'Camera';
      case 'bump': return 'AlertTriangle';
      case 'pothole': return 'Construction';
      default: return 'MapPin';
    }
  };

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'camera': return 'bg-red-500';
      case 'bump': return 'bg-yellow-500';
      case 'pothole': return 'bg-orange-500';
      default: return 'bg-blue-500';
    }
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'gas': return 'Fuel';
      case 'wash': return 'Droplets';
      case 'service': return 'Wrench';
      default: return 'Store';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 bg-secondary shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Icon name="Car" size={28} className="text-primary" />
            Сызрань Автогид
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {activeTab === 'garage' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Мой Гараж</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Icon name="Plus" size={20} />
                    Добавить авто
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Добавить автомобиль</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Марка</Label>
                      <Input placeholder="Lada" />
                    </div>
                    <div className="space-y-2">
                      <Label>Модель</Label>
                      <Input placeholder="Granta" />
                    </div>
                    <div className="space-y-2">
                      <Label>Год выпуска</Label>
                      <Input type="number" placeholder="2020" />
                    </div>
                    <div className="space-y-2">
                      <Label>Гос. номер</Label>
                      <Input placeholder="А777АА 163" />
                    </div>
                    <Button className="w-full">Сохранить</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {cars.map((car) => (
              <Card key={car.id} className="p-6 shadow-lg hover-scale">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{car.brand} {car.model}</h3>
                    <p className="text-muted-foreground">{car.year} • {car.plate}</p>
                  </div>
                  <Badge variant="secondary" className="text-lg font-semibold">
                    {car.mileage.toLocaleString()} км
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Icon name="Gauge" size={18} />
                      <span className="text-sm">Расход топлива</span>
                    </div>
                    <p className="text-2xl font-bold">{car.fuelConsumption} л/100км</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Icon name="Fuel" size={18} />
                      <span className="text-sm">Заправок</span>
                    </div>
                    <p className="text-2xl font-bold">{refuels.filter(r => r.carId === car.id).length}</p>
                  </div>
                </div>

                <Tabs defaultValue="refuels" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="refuels">Заправки</TabsTrigger>
                    <TabsTrigger value="expenses">Расходы</TabsTrigger>
                  </TabsList>
                  <TabsContent value="refuels" className="space-y-3 mt-4">
                    <div className="flex justify-end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="gap-2">
                            <Icon name="Plus" size={16} />
                            Добавить заправку
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Новая заправка</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label>Дата</Label>
                              <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                            </div>
                            <div className="space-y-2">
                              <Label>АЗС</Label>
                              <Input placeholder="Роснефть на ул. Гидротурбинная" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Литров</Label>
                                <Input type="number" placeholder="40" />
                              </div>
                              <div className="space-y-2">
                                <Label>Цена за литр</Label>
                                <Input type="number" placeholder="51.5" step="0.1" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Пробег</Label>
                              <Input type="number" placeholder="45320" />
                            </div>
                            <Button className="w-full">Сохранить</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    {refuels.filter(r => r.carId === car.id).map((refuel) => (
                      <Card key={refuel.id} className="p-4 bg-card/50">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold">{refuel.station}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(refuel.date).toLocaleDateString('ru-RU')}
                            </p>
                          </div>
                          <Badge variant="outline">{refuel.mileage.toLocaleString()} км</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{refuel.liters} л × {refuel.pricePerLiter} ₽</span>
                          <span className="font-bold text-lg">{(refuel.liters * refuel.pricePerLiter).toFixed(2)} ₽</span>
                        </div>
                      </Card>
                    ))}
                  </TabsContent>
                  <TabsContent value="expenses" className="space-y-3 mt-4">
                    <div className="text-center py-8 text-muted-foreground">
                      <Icon name="Receipt" size={48} className="mx-auto mb-3 opacity-50" />
                      <p>Расходов пока нет</p>
                      <Button size="sm" variant="outline" className="mt-4 gap-2">
                        <Icon name="Plus" size={16} />
                        Добавить расход
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'map' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Карта Сызрани</h2>
              <Button variant="outline" className="gap-2">
                <Icon name="Plus" size={20} />
                Добавить метку
              </Button>
            </div>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 min-h-[300px] flex items-center justify-center shadow-lg">
              <div className="text-center">
                <Icon name="Map" size={64} className="mx-auto mb-4 text-primary" />
                <p className="text-xl font-semibold mb-2">Интерактивная карта</p>
                <p className="text-muted-foreground">Здесь будет интеграция с Яндекс.Картами</p>
              </div>
            </Card>

            <div className="space-y-3">
              <h3 className="font-bold text-lg">Метки на карте</h3>
              {markers.map((marker) => (
                <Card key={marker.id} className="p-4 hover-scale">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${getMarkerColor(marker.type)} flex items-center justify-center`}>
                      <Icon name={getMarkerIcon(marker.type)} size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{marker.name}</p>
                      <p className="text-sm text-muted-foreground">{marker.address}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Icon name="MapPin" size={20} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'directory' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold">Справочник</h2>

            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="gas">АЗС</TabsTrigger>
                <TabsTrigger value="wash">Мойки</TabsTrigger>
                <TabsTrigger value="service">Сервисы</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-3 mt-4">
                {services.map((service) => (
                  <Card key={service.id} className="p-4 hover-scale">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name={getServiceIcon(service.type)} size={24} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold">{service.name}</h3>
                            <p className="text-sm text-muted-foreground">{service.address}</p>
                          </div>
                          <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded">
                            <Icon name="Star" size={14} className="text-yellow-600 fill-yellow-600" />
                            <span className="text-sm font-semibold">{service.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="gap-2">
                            <Icon name="Phone" size={16} />
                            {service.phone}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Icon name="Navigation" size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="gas" className="space-y-3 mt-4">
                {services.filter(s => s.type === 'gas').map((service) => (
                  <Card key={service.id} className="p-4 hover-scale">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Fuel" size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{service.address}</p>
                        <Button size="sm" variant="outline" className="gap-2">
                          <Icon name="Phone" size={16} />
                          {service.phone}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="wash" className="space-y-3 mt-4">
                {services.filter(s => s.type === 'wash').map((service) => (
                  <Card key={service.id} className="p-4 hover-scale">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Droplets" size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{service.address}</p>
                        <Button size="sm" variant="outline" className="gap-2">
                          <Icon name="Phone" size={16} />
                          {service.phone}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="service" className="space-y-3 mt-4">
                {services.filter(s => s.type === 'service').map((service) => (
                  <Card key={service.id} className="p-4 hover-scale">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Wrench" size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{service.address}</p>
                        <Button size="sm" variant="outline" className="gap-2">
                          <Icon name="Phone" size={16} />
                          {service.phone}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-2xl z-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-2 py-3">
            <button
              onClick={() => setActiveTab('garage')}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-all ${
                activeTab === 'garage'
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Icon name="Car" size={24} />
              <span className="text-xs font-semibold">Гараж</span>
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-all ${
                activeTab === 'map'
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Icon name="Map" size={24} />
              <span className="text-xs font-semibold">Карта</span>
            </button>

            <button
              onClick={() => setActiveTab('directory')}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-all ${
                activeTab === 'directory'
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Icon name="Book" size={24} />
              <span className="text-xs font-semibold">Справочник</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;
