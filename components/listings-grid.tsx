export default function ListingsGrid() {
  const items = [
    { id: '1', title: 'Intracoastal Estate in Jupiter', price: '$4,250,000' },
    { id: '2', title: 'Oceanfront Condo, Singer Island', price: '$1,150,000' },
    { id: '3', title: 'Gated Community Home, PBG', price: '$975,000' },
  ]
  return (
    <section className="container py-8">
      <h2 className="font-serif text-2xl mb-4">Featured Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(x => (
          <div key={x.id} className="rounded-2xl border p-4">
            <div className="aspect-video rounded-xl bg-slate-200 mb-3" />
            <div className="font-medium">{x.title}</div>
            <div className="text-slate-600">{x.price}</div>
          </div>
        ))}
      </div>
    </section>
  )
}