export function generateMinePositions(totalCells, mineCount) {
  const positions = new Set();
  
  const allPositions = Array.from({ length: totalCells }, (_, i) => i);
  
  for (let i = allPositions.length - 1; i > 0; i--) {
    const randomBytes = new Uint32Array(1);
    crypto.getRandomValues(randomBytes);
    const j = randomBytes[0] % (i + 1);
    [allPositions[i], allPositions[j]] = [allPositions[j], allPositions[i]];
  }
  
  for (let i = 0; i < mineCount; i++) {
    positions.add(allPositions[i]);
  }
  
  return positions;
}

export function generateClientSeed() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}
